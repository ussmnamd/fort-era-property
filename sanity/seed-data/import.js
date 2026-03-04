const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Configuration - Replace with your actual values
const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID || '2sxoorsd',
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN, // Need a token with write permissions
    apiVersion: '2024-03-01',
    useCdn: false,
});

async function importData() {
    console.log('🚀 Starting data import...\n');

    // Import order matters due to references
    const importOrder = [
        { file: 'societies.json', name: 'Societies' },
        { file: 'testimonials.json', name: 'Testimonials' },
        { file: 'market-insights.json', name: 'Market Insights' },
        // Properties import separately after getting society references
    ];

    for (const item of importOrder) {
        const filePath = path.join(__dirname, item.file);

        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Skipping ${item.name}: File not found`);
            continue;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(`📥 Importing ${data.length} ${item.name}...`);

        for (const doc of data) {
            try {
                // For market insights, we need to find and link the society
                if (doc._type === 'marketInsight') {
                    const societyName = item.file === 'market-insights.json'
                        ? getSocietyNameFromInsightTitle(doc.title)
                        : null;

                    if (societyName) {
                        const society = await client.fetch(
                            `*[_type == "society" && name == $name][0]._id`,
                            { name: societyName }
                        );
                        if (society) {
                            doc.society = { _type: 'reference', _ref: society };
                        }
                    }
                }

                await client.create(doc);
                console.log(`  ✅ Created: ${doc.name || doc.title || doc.clientName}`);
            } catch (err) {
                console.error(`  ❌ Error creating ${doc.name || doc.title}: ${err.message}`);
            }
        }
        console.log('');
    }

    // Import properties after societies are created
    const propertiesFile = path.join(__dirname, 'properties.json');
    if (fs.existsSync(propertiesFile)) {
        const properties = JSON.parse(fs.readFileSync(propertiesFile, 'utf8'));
        console.log(`📥 Importing ${properties.length} Properties...`);

        for (const doc of properties) {
            try {
                // Find and link society based on title
                const societyName = getSocietyNameFromPropertyTitle(doc.title);
                const society = await client.fetch(
                    `*[_type == "society" && name == $name][0]._id`,
                    { name: societyName }
                );

                if (society) {
                    doc.society = { _type: 'reference', _ref: society };
                }

                await client.create(doc);
                console.log(`  ✅ Created: ${doc.title}`);
            } catch (err) {
                console.error(`  ❌ Error creating ${doc.title}: ${err.message}`);
            }
        }
    }

    console.log('\n✨ Import complete!');
}

function getSocietyNameFromInsightTitle(title) {
    if (title.includes('DHA')) return 'DHA Lahore';
    if (title.includes('Bahria')) return 'Bahria Town Lahore';
    if (title.includes('Lake City')) return 'Lake City';
    if (title.includes('Gulberg')) return 'Gulberg';
    return null;
}

function getSocietyNameFromPropertyTitle(title) {
    if (title.includes('DHA')) return 'DHA Lahore';
    if (title.includes('Bahria')) return 'Bahria Town Lahore';
    if (title.includes('Lake City')) return 'Lake City';
    if (title.includes('Gulberg')) return 'Gulberg';
    return null;
}

// Run import
importData().catch(console.error);
