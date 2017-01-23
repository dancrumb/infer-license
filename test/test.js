/**
 * Created by danrumney on 1/17/17.
 */
const infer = require('../infer-license');
const licenses = require('spdx-license-list/spdx-full');
const expect = require('chai').expect;

const methodsUnderTest = Object.keys(infer).filter(function (method) {
  return /is.*/.test(method);
});

function onlyOneIsTrue(list) {
  return list.filter(Boolean).length === 1;
}

/*
 * This maps an SPDX identifier to the method that should identify it.
 */
const spdxToMatchMethod = {
  'MIT': 'isMIT',
  'BSD-2-Clause': 'isBSD',
  'BSD-3-Clause': 'isBSD',
  'BSD-4-Clause': 'isBSD',
  'ISC': 'isISC',
  'LGPL-2.0': 'isLGPL',
  'LGPL-2.1': 'isLGPL',
  'LGPL-3.0': 'isLGPL',
  'Apache-1.0': 'isApache',
  'Apache-1.1': 'isApache',
  'Apache-2.0': 'isApache',
  'EPL-1.0': 'isEclipse',
  'WTFPL': 'isWTF'
};

function isXXX(license) {
  return function (methodName) {
    return (infer[methodName](license));
  }
}

describe('infer-license', function () {
  Object.keys(spdxToMatchMethod).forEach(function (spdx) {
    describe('Support for ' + spdx, function () {
      const license = licenses[spdx].license;

      it('correctly identifies the license', function () {
        expect(infer.inferLicense(license)).to.equal(spdx);
      });

      it('uniquely identifies the license', function () {
        // eslint-disable-next-line no-unused-expressions
        expect(onlyOneIsTrue(methodsUnderTest.map(isXXX(license)))).to.be.ok;
      });
    });
  });
});

describe('findLicenseLinks', function () {
  it('can detect a link to a single license', function () {
    expect(infer.findLicenseLinks("https://opensource.org/licenses/MIT")).to.equal('MIT');
    expect(infer.findLicenseLinks("https://spdx.org/licenses/MIT")).to.equal('MIT');
  });
  it('can detect multiple links to multiple licenses', function () {
    expect(infer.findLicenseLinks("https://opensource.org/licenses/MIT blah blah https://spdx.org/licenses/BSD-3-Clause"))
      .to.equal("(MIT OR BSD-3-Clause)");
  });
  it('can detect multiple links to the same license', function () {
    expect(infer.findLicenseLinks("https://opensource.org/licenses/Apache-2.0 blah blah https://spdx.org/licenses/Apache-2.0"))
      .to.equal("Apache-2.0");
  });
});