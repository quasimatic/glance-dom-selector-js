import dom from "../dom"
import extension from '../../src/extensions/nodetype';

describe("Locator: Exact Match", function () {
    let findByNodeType = extension.properties.nodetype.locate;
    beforeEach(function () {
        document.body.innerHTML = "";
    });

    it("should find by node type", function () {
        dom.render(<p id="target"></p>);

        findByNodeType({label: "p", container:document.body}).should.deep.equal([dom.get("target")]);
    });

    it("should not find by node type", function () {
        dom.render(<span></span>);
        
        findByNodeType({label: "p", container:document.body}).should.deep.equal([]);
    });
});