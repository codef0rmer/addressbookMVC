var Collection, Document, Events, Model, ProperDocument, count, deepEqual, equal, ok, oldOk, properTempest, tempest, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = require('assert'), ok = _ref.ok, equal = _ref.equal, deepEqual = _ref.deepEqual;

_ref1 = require('../backbone'), Model = _ref1.Model, Collection = _ref1.Collection, Events = _ref1.Events;

count = 0;

oldOk = ok;

ok = function() {
  oldOk.apply(null, arguments);
  return count++;
};

Document = (function(_super) {

  __extends(Document, _super);

  function Document() {
    return Document.__super__.constructor.apply(this, arguments);
  }

  Document.prototype.fullName = function() {
    return this.get('name') + ' ' + this.get('surname');
  };

  return Document;

})(Model);

tempest = new Document({
  id: '1-the-tempest',
  title: "The Tempest",
  name: "William",
  surname: "Shakespeare",
  length: 123
});

ok(tempest.fullName() === "William Shakespeare");

ok(tempest.get('length') === 123);

ProperDocument = (function(_super) {

  __extends(ProperDocument, _super);

  function ProperDocument() {
    return ProperDocument.__super__.constructor.apply(this, arguments);
  }

  ProperDocument.prototype.fullName = function() {
    return "Mr. " + ProperDocument.__super__.fullName.apply(this, arguments);
  };

  return ProperDocument;

})(Document);

properTempest = new ProperDocument(tempest.attributes);

ok(properTempest.fullName() === "Mr. William Shakespeare");

ok(properTempest.get('length') === 123);

console.log("passed " + count + " tests");
