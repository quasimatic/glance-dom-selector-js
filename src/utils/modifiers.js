import mergeObjects from "../utils/merge-objects";

export default class Modifiers {
    static beforeFilters(elements, extensions, data) {
        return extensions.filter(e => e.beforeFilter).reduce((elements, e) => e.beforeFilter(elements, data), elements);
    }

    static afterFilters(elements, extensions, data) {
        return extensions.filter(e => e.afterFilter).reduce((elements, e) => e.afterFilter(elements, data), elements);
    }

    static beforePositional(elements, position, extensions, data) {
        return extensions.filter(e => e.beforePositional).reduce((elements, e) => e.beforePositional(elements, position, data), elements);
    }

    static afterPositional(elements, position, extensions, data) {
        return extensions.filter(e => e.afterPositional).reduce((elements, e) => e.afterPositional(elements, position, data), elements);
    }

    static getFilters(target, extensions) {
        let filters = [];
        let labels = Modifiers.labels(extensions);
        let properties = Modifiers.properties(extensions)

        if (labels[target.label] && labels[target.label].filter) {
            filters = filters.concat(labels[target.label].filter);
        }

        if (target.properties.length > 0) {
            let propertiesWithFilters = target.properties.filter(name => properties[name] && properties[name].filter);

            if (propertiesWithFilters.length != 0) {
                filters = filters.concat(propertiesWithFilters.map(name => properties[name].filter));
            }
        }

        return filters.length > 0 ? filters : null;
    }

    static labels(extensions) {
        return extensions.filter(e => e.labels).reduce((m, e) => mergeObjects(m, e.labels), {});
    }

    static properties(extensions) {
        return extensions.filter(e => e.properties).reduce((m, e) => mergeObjects(m, e.properties), {});
    }


    static locatorForLabel(key, extensions) {
        return extensions.filter(e => e.labels && e.labels[key]).map(e => e.labels[key]);
    }

    static locateBeforeFromLabel(label, extensions) {
        return Modifiers.locatorForLabel(label, extensions).filter(e => e.beforeLocate).map(e => e.beforeLocate);
    }

    static locateAfterFromLabel(label, extensions) {
        return Modifiers.locatorForLabel(label, extensions).filter(e => e.afterLocate).map(e => e.afterLocate);
    }

    static locateBeforeEvent(extensions) {
        return extensions.filter(e => e.beforeLocate).map(e => e.beforeLocate);
    }

    static locateAfterEvent(extensions) {
        return extensions.filter(e => e.afterLocate).map(e => e.afterLocate);
    }


    static locatorFromProperty(target, properties) {
        if (target.properties.length > 0) {
            let propertyNames = target.properties.filter(name => properties[name] && properties[name].locator);
            if (propertyNames.length > 0)
                return properties[propertyNames[0]].locator;
        }
    }
}