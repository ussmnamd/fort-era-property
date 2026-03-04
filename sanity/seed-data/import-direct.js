const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Configuration using the provided token
const client = createClient({
    projectId: '2sxoorsd',
    dataset: 'production',
    token: 'skq6ZqCC1bsALDxqwdGrwOnzzYlnOoJaTjvksjIQRoysgrj4pfCuFlspMtNQiFTjMnC892RSYRJPGhFni5q69Yrkl6wONnO32Xdo8xuDQThWhGB87OaTUpBpKJdJbrMTwrfB81cpXTrp70rVh62bqyNrW1dwp6Gllyd0oaNdXDoajGeGhOm3',
    apiVersion: '2024-03-01',
    useCdn: false,
});

async function importData() {
    console.log('🚀 Starting data import to Sanity...\n');

    // Track created society IDs for linking
    const societyIds = {};

    // 1. Import Societies first
    console.log('📥 Importing Societies...');
    const societiesFile = path.join(__dirname, 'societies.json');
    const societies = JSON.parse(fs.readFileSync(societiesFile, 'utf8'));

    for (const doc of societies) {
        try {
            const result = await client.create(doc);
            societyIds[doc.name] = result._id;
            console.log(`  ✅ Created society: ${doc.name} (${result._id})`);
        } catch (err) {
            console.error(`  ❌ Error creating ${doc.name}: ${err.message}`);
        }
    }
    console.log('');

    // 2. Import Testimonials
    console.log('📥 Importing Testimonials...');
    const testimonialsFile = path.join(__dirname, 'testimonials.json');
    const testimonials = JSON.parse(fs.readFileSync(testimonialsFile, 'utf8'));

    for (const doc of testimonials) {
        try {
            const result = await client.create(doc);
            console.log(`  ✅ Created testimonial: ${doc.clientName}`);
        } catch (err) {
            console.error(`  ❌ Error creating testimonial: ${err.message}`);
        }
    }
    console.log('');

    // 3. Import Market Insights with society references
    console.log('📥 Importing Market Insights...');
    const insightsFile = path.join(__dirname, 'market-insights.json');
    const insights = JSON.parse(fs.readFileSync(insightsFile, 'utf8'));

    const societyNameMap = {
        'DHA': 'DHA Lahore',
        'Bahria': 'Bahria Town Lahore',
        'Lake City': 'Lake City',
        'Gulberg': 'Gulberg'
    };

    for (const doc of insights) {
        try {
            // Find society name from title
            let societyName = null;
            for (const [key, value] of Object.entries(societyNameMap)) {
                if (doc.title.includes(key)) {
                    societyName = value;
                    break;
                }
            }

            if (societyName && societyIds[societyName]) {
                doc.society = {
                    _type: 'reference',
                    _ref: societyIds[societyName]
                };
            }

            const result = await client.create(doc);
            console.log(`  ✅ Created insight: ${doc.title}`);
        } catch (err) {
            console.error(`  ❌ Error creating insight: ${err.message}`);
        }
    }
    console.log('');

    // 4. Import Properties with society references
    console.log('📥 Importing Properties...');
    const propertiesFile = path.join(__dirname, 'properties.json');
    const properties = JSON.parse(fs.readFileSync(propertiesFile, 'utf8'));

    for (const doc of properties) {
        try {
            // Find society based on property title
            let societyName = null;
            for (const [key, value] of Object.entries(societyNameMap)) {
                if (doc.title.includes(key)) {
                    societyName = value;
                    break;
                }
            }

            if (societyName && societyIds[societyName]) {
                doc.society = {
                    _type: 'reference',
                    _ref: societyIds[societyName]
                };
            }

            const result = await client.create(doc);
            console.log(`  ✅ Created property: ${doc.title}`);
        } catch (err) {
            console.error(`  ❌ Error creating property: ${err.message}`);
        }
    }

    console.log('\n✨ Import complete!');
    console.log('\n📊 Summary:');
    console.log(`   Societies: ${Object.keys(societyIds).length} created`);
    console.log('   Testimonials: imported');
    console.log('   Market Insights: imported');
    console.log('   Properties: imported');
    console.log('\n📝 Note: You need to manually upload images in Sanity Studio');
    console.log('   Studio URL: https://2sxoorsd.sanity.studio');
}

// Run import
importData().catch(console.error);
