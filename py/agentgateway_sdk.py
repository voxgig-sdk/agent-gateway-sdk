# AgentGateway SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import AgentGatewayUtility
from core.spec import AgentGatewaySpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import AgentGatewayBaseFeature
from features import _make_feature


class AgentGatewaySDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = AgentGatewayUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return AgentGatewayUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = AgentGatewaySpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def analytics(self):
        """Idiomatic facade: client.analytics.list() / client.analytics.load({"id": ...})."""
        from entity.analytics_entity import AnalyticsEntity
        cached = getattr(self, "_analytics", None)
        if cached is None:
            cached = AnalyticsEntity(self, None)
            self._analytics = cached
        return cached

    def Analytics(self, data=None):
        # Deprecated: use client.analytics instead.
        from entity.analytics_entity import AnalyticsEntity
        return AnalyticsEntity(self, data)


    @property
    def api_key(self):
        """Idiomatic facade: client.api_key.list() / client.api_key.load({"id": ...})."""
        from entity.api_key_entity import ApiKeyEntity
        cached = getattr(self, "_api_key", None)
        if cached is None:
            cached = ApiKeyEntity(self, None)
            self._api_key = cached
        return cached

    def ApiKey(self, data=None):
        # Deprecated: use client.api_key instead.
        from entity.api_key_entity import ApiKeyEntity
        return ApiKeyEntity(self, data)


    @property
    def balance(self):
        """Idiomatic facade: client.balance.list() / client.balance.load({"id": ...})."""
        from entity.balance_entity import BalanceEntity
        cached = getattr(self, "_balance", None)
        if cached is None:
            cached = BalanceEntity(self, None)
            self._balance = cached
        return cached

    def Balance(self, data=None):
        # Deprecated: use client.balance instead.
        from entity.balance_entity import BalanceEntity
        return BalanceEntity(self, data)


    @property
    def meta(self):
        """Idiomatic facade: client.meta.list() / client.meta.load({"id": ...})."""
        from entity.meta_entity import MetaEntity
        cached = getattr(self, "_meta", None)
        if cached is None:
            cached = MetaEntity(self, None)
            self._meta = cached
        return cached

    def Meta(self, data=None):
        # Deprecated: use client.meta instead.
        from entity.meta_entity import MetaEntity
        return MetaEntity(self, data)


    @property
    def payment(self):
        """Idiomatic facade: client.payment.list() / client.payment.load({"id": ...})."""
        from entity.payment_entity import PaymentEntity
        cached = getattr(self, "_payment", None)
        if cached is None:
            cached = PaymentEntity(self, None)
            self._payment = cached
        return cached

    def Payment(self, data=None):
        # Deprecated: use client.payment instead.
        from entity.payment_entity import PaymentEntity
        return PaymentEntity(self, data)


    @property
    def service(self):
        """Idiomatic facade: client.service.list() / client.service.load({"id": ...})."""
        from entity.service_entity import ServiceEntity
        cached = getattr(self, "_service", None)
        if cached is None:
            cached = ServiceEntity(self, None)
            self._service = cached
        return cached

    def Service(self, data=None):
        # Deprecated: use client.service instead.
        from entity.service_entity import ServiceEntity
        return ServiceEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
