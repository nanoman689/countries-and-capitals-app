/* jasmine go here */

describe("countryData", function() {
    beforeEach(module('myApp'));

    it('should return "0" when called', function(){
      inject(function(countryData){
        expect(countryData.getCountries().length).toBe(0);
      })
    })
    it('should query the backend when calling countryData', function(){
    inject(function(countryData, $rootScope, $httpBackend){
      $httpBackend.expect('GET', 'http://api.geonames.org/countryInfo?username=nanoman689@gmail.com').respond(200,'<?xml version="1.0" encoding="UTF-8" standalone="no"?><geonames><country><countryCode>AD</countryCode><countryName>Andorra</countryName><isoNumeric>020</isoNumeric><isoAlpha3>AND</isoAlpha3><fipsCode>AN</fipsCode><continent>EU</continent><continentName>Europe</continentName><capital>Andorra la Vella</capital><areaInSqKm>468.0</areaInSqKm><population>84000</population><currencyCode>EUR</currencyCode><languages>ca</languages><geonameId>3041565</geonameId><west>1.4071867141112762</west><north>42.65604389629997</north><east>1.7865427778319827</east><south>42.42849259876837</south><postalCodeFormat>AD###</postalCodeFormat></country><country><countryCode>AD</countryCode><countryName>Andorra</countryName><isoNumeric>020</isoNumeric><isoAlpha3>AND</isoAlpha3><fipsCode>AN</fipsCode><continent>EU</continent><continentName>Europe</continentName><capital>Andorra la Vella</capital><areaInSqKm>468.0</areaInSqKm><population>84000</population><currencyCode>EUR</currencyCode><languages>ca</languages><geonameId>3041565</geonameId><west>1.4071867141112762</west><north>42.65604389629997</north><east>1.7865427778319827</east><south>42.42849259876837</south><postalCodeFormat>AD###</postalCodeFormat></country></geonames>');
      countryData.fetch();
      $httpBackend.flush();
      expect(countryData.getCountries().length).toBeGreaterThan(0);
      expect(countryData.findCountries('AD').countryCode).toBe('AD');
      $httpBackend.verifyNoOutstandingRequest();
        })
    })
});
