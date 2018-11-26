Array.prototype.contains = function(obj) {
    let i = this.length;
    while(i--) {
        if(!Array.isArray(obj)) {
            if(this[i] === obj)
                return true;
        } else {
            if(obj.length == 0)
                return false;

            return _.intersection(this, obj).length > 0;
        }
    }
    return false;
};

String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
};