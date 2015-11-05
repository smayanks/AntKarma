

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (LifeInsurances.find().count() === 0) {
		var lifeInsRecos = [{ productName: 'HDFC Life', productSubtext: 'Click 2 Protect Plus - Life Option',img: '/images/hdfc.png',  sumAssured: "10000000", 
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '90.5%', AnnualPremium: '12,000', 
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [{text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			},
			{ productName: 'Reliance Life', productSubtext: 'Online Term',img: '/images/reli.png', sumAssured: "10000000", 
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '83.2%', AnnualPremium: '8,500', otherDetails: '',
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [ {text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			},
			{ productName: 'Balaji Alliance', productSubtext: 'iSecure',img: '/images/ba.png', sumAssured: "10000000", 
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '91.9%', AnnualPremium: '12,000', otherDetails: '',
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [{text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			},
			{ productName: 'AEGON', productSubtext: 'iTerm + ADB Rider + WOP Rider + iCI Rider',img: '/images/ar.png', sumAssured: "20000000", 
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '91.9%', AnnualPremium: '24,000', otherDetails: '',
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [{text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			},
			{ productName: 'HDFC Life', productSubtext: 'Click 2 Protect Plus - Life Option',img: '/images/hdfc.png',  sumAssured: "20000000", 
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '90.5%', AnnualPremium: '24,000', 
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [{text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			},
			{ productName: 'Reliance Life', productSubtext: 'Online Term',img: '/images/reli.png', sumAssured: "20000000", 
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '83.2%', AnnualPremium: '16,500', otherDetails: '',
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [ {text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			}
			,
			{ productName: 'Max Life', productSubtext: 'Online Term Plan Life Cover + Increasing Monthly Income + Comprehensive Accidental Benefit Rider',img: '/images/max.png',  sumAssured: "5000000",
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '94.5%', AnnualPremium: '6,000', 
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [{text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			},
			{ productName: 'Reliance Life', productSubtext: 'Online Term',img: '/images/reli.png', sumAssured: "5000000",
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '83.2%', AnnualPremium: '5,500', otherDetails: '',
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [ {text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			},
			{ productName: 'Balaji Alliance', productSubtext: 'iSecure',img: '/images/ba.png', sumAssured: "5000000", 
			additionalCoverage: 'Only Basic Cover', claimSettlementRatio: '91.9%', AnnualPremium: '6,000', otherDetails: '',
			coverageHightlights: ['Tax Benefits under Section 80C', 'Home Medicals', 'Multiple nominees', 'Special discount rate for non-smokers', 'Discounts for women', 'Joint life option', 'NRI (Non Resident Indians) friendly'],
			criticalFactors: [{text: 'Grievances Resolved', value: '99.8%'}, {text: 'Permium from new buyers', value: '2,592 Crore'}],
			specialFeatures: ['Include your spouse later, if you are single at present.', 'Your nominee will have the option to take the death benefit in equal monthly installments over a period of 5 or 10 years.'],
			downloads: [{'Product Brochure': 'www.brochure.com'}, {'Policy wording': 'www.brochure.com/policywording'}]
			}
		];

      for (var i = 0; i < lifeInsRecos.length; i++)
        LifeInsurances.insert(lifeInsRecos[i]);
    }
  });
}


