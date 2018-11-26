export const permissions = state => state.user.user.Permissions;
export const isLogin = state => typeof state.user.user.Id !== 'undefined';
export const user = state => state.user.user;