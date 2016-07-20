import glance from '../../src/selector';
import dom from "../dom";

describe("Extensions: labels", function () {
    let calledEvents = [];
    before(function () {
        document.body.innerHTML = "";

        dom.render(
            <div className="scope">
                <div id="custom-label">
                    <div>item 1</div>
                </div>
            </div>
        );
        
        glance.addExtension({
            labels: {
                "custom label": {
                    locate: function (label, scope, {glance}, callback) {
                        calledEvents.push('label locate');
                        return callback([document.getElementById('custom-label')]);
                    },
                    filter: function(elements, data, resultHandler) {
                        calledEvents.push("label filter");
                        return resultHandler(null, elements);
                    }
                }
            },

            properties: {
                "custom-property": {
                    locate: function (label, scope, {glance}, callback) {
                        calledEvents.push('property locate');
                        return callback(null, [document.getElementById('custom-label')]);
                    },
                    filter: function (elements, data, resultHandler) {
                        calledEvents.push('property filter');
                        return resultHandler(null, elements);
                    }
                },
                "another-property": {
                    locate: function (label, scope, {glance}, callback) {
                        calledEvents.push('property locate');
                        return callback(null, [document.getElementById('custom-label')]);
                    }
                }
            },

            beforeScope: function () {
                calledEvents.push('beforeScope');
            },

            afterScope: function () {
                calledEvents.push('afterScope');
            },

            beforeFilters: function (elements) {
                calledEvents.push('beforeFilters');
                return elements;
            },

            afterFilters: function (elements, data, resultHandler) {
                calledEvents.push('afterFilters');
                return elements;
            },

            beforeLocate() {
                calledEvents.push('beforeLocate');
            },

            afterLocate() {
                calledEvents.push('afterLocate');
            },

            beforePositional(elements) {
                calledEvents.push('beforePositional');
                return elements;
            },

            afterPositional(elements) {
                calledEvents.push('afterPositional');
                return elements;
            }
        });

        return glance("scope > custom label:custom-property > item 1:another-property");
    });

    it("should call events in correct order", function () {
        calledEvents.should.deep.equal([ 
            'beforeScope',
            'beforeLocate',
            'afterLocate',
            'beforeFilters',
            'afterFilters',
            'beforePositional',
            'afterPositional',
            'afterScope',
            'beforeScope',
            'beforeLocate',
            'property locate',
            'afterLocate',
            'beforeFilters',
            'label filter',
            'property filter',
            'afterFilters',
            'beforePositional',
            'afterPositional',
            'afterScope',
            'beforeScope',
            'beforeLocate',
            'property locate',
            'afterLocate',
            'beforeFilters',
            'afterFilters',
            'beforePositional',
            'afterPositional',
            'afterScope' ]);
    });
});