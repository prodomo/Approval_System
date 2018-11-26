import store from "@/vuex/store";
import mixin from "@/lib/mixin";

export default async(to, from, next) => {
    store.commit('UPDATE_PAGE_LOADING', true);
    await mixin.syncUser();
    const isLogin = store.getters['isLogin'];
    store.commit('UPDATE_PAGE_LOADING', false);

    if(to.matched.some(record => record.meta.auth)) {
        if(isLogin) {
            const permissions = store.getters['permissions'];
            for(let i = 0; i < to.matched.length; i++) {
                const meta = to.matched[i].meta;
                if(typeof meta.permissions !== 'undefined') {
                    let routesPermissions = [];
                    if(typeof meta.permissions !== 'undefined')
                        routesPermissions = meta.permissions;

                    if(routesPermissions.length > 0) {
                        if(!permissions.contains(routesPermissions)) {
                            const redirects = _.compact(_.map(to.matched, 'meta.redirect'));
                            if(redirects.length > 0) {
                                const redirect = redirects[redirects.length - 1];
                                next(redirect);
                            } else {
                                next('/');
                            }
                        }
                    }
                }

                if(i == to.matched.length - 1) {
                    next();
                }
            }
        } else {
            const redirects = _.compact(_.map(to.matched, 'meta.redirect'));
            if(redirects.length > 0) {
                const redirect = redirects[redirects.length - 1];
                next(redirect);
            } else {
                next('/');
            }
        }
    } else {
        if(isLogin) {
            next('/permissionTypes');
        } else {
            next();
        }
    }
};