import dom from "../dom"
import extension from '../../src/extensions/class';

describe("Locator: Class", function() {
    let findByClass = extension.properties["class"].locate;
    beforeEach(function(){
        document.body.innerHTML = "";
    });

    it("should find by class name", function() {
        dom.render(<div className="class-name" id="target">text</div>);

        findByClass({label:"class-name", scopeElement:document.body}).should.deep.equal([dom.get("target")]);
    });

    it("should not find by class name", function() {
        dom.render(<div className="class-name">text</div>);

        findByClass({label:"missing-class", scopeElement:document.body}).should.deep.equal([]);
    });
});