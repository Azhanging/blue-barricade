const utils = {
	hook ( ctx: any, fn: any, args?: any[] ) {
		if (typeof fn === 'function') {
			return fn.apply(ctx, args);
		}
		return fn;
	}
};

export default utils;