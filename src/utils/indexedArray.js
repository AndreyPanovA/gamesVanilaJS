const CustomArray = new Proxy(Array, {
    construct(target, argArray, newTarget) {
        let index = {}
        argArray.forEach((el, idx) => index[el.id] = {...el, y: idx})
        return new Proxy(target(...argArray), {
            get(arr, prop, receiver) {
                switch (prop) {
                    case 'push':
                        return (item) => {
                            index[item["id"]] = item;
                            arr[prop].call(arr, item);
                        };
                    case 'findById':
                        return (id) => {
                            if (!Boolean(arr[0] instanceof Object)) {
                                console.log('items is no Object values, idx instead');
                                return arr[id];
                            }
                            return index[id];
                        };
                    case 'getObjectView':
                        return index;
                    case 'getSetArr':
                        return new Set(arr);
                    case 'getAnimationsList':
                        return Object.keys(index)
                    default:
                        return Reflect.get(arr, prop, receiver);
                }
            },
        })
    }
})
export default CustomArray
