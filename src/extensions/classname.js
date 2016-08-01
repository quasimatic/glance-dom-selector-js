import findByCSS from "./css"

export default {
    properties: {
        classname: {
            locate: function ({label, container}, resultHandler = (err, result) => result) {
                try {
                    return browserExecute(findByCSS, `.${label}`, container, resultHandler);
                }
                catch (e) {
                    return resultHandler(null, []);
                }
            }
        }
    }
}