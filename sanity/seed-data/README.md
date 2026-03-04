# Sanity Seed Data

This folder contains sample content for your Property CMS. You have two options to add this data to your Sanity project:

## Option 1: Manual Entry (Recommended for First Time)

1. Start your Sanity Studio:

   ```bash
   cd sanity
   npm install
   npm run dev
   ```

2. Open `http://localhost:3333` in your browser

3. Create content in this order:
   - **Societies first** (properties reference them)
   - Then **Properties**
   - Then **Testimonials** and **Market Insights**

### Sample Data Reference

**Societies to create:**

- DHA Lahore (featured)
- Bahria Town Lahore (featured)
- Lake City (featured)
- Gulberg

**Properties to create:**

- Luxury 1 Kanal House in DHA Phase 6 (featured)
- 10 Marla Plot in Bahria Town Overseas B (featured)
- 2 Kanal Farmhouse in Lake City M-2 Block (featured)
- 5 Marla House in Bahria Town Sector C (featured)
- 4 Marla Commercial Plaza in Gulberg
- 3 Bedroom Apartment in DHA Phase 5

## Option 2: Import Script (Faster)

### Prerequisites

1. You need a **write token** from Sanity:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Select your project
   - Go to **API → Tokens**
   - Create a new token with **Editor** or **Administrator** permissions

2. Install the Sanity client in the seed-data folder:

   ```bash
   cd sanity/seed-data
   npm init -y
   npm install @sanity/client
   ```

3. Create a `.env` file:

   ```env
   SANITY_PROJECT_ID=2sxoorsd
   SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token_here
   ```

### Run Import

```bash
node import.js
```

This will automatically:

1. Import all societies
2. Import testimonials
3. Import market insights (with society references)
4. Import properties (with society references)

## Adding Images

The seed data doesn't include images. You'll need to manually upload:

- **Society cover images** - Representative photos of each society
- **Property featured images** - Main photo for each property
- **Property gallery images** - Additional photos
- **Testimonial photos** - Client profile pictures (optional)

## Customizing Content

Feel free to modify the JSON files with your own:

- Property prices and descriptions
- Society details
- Testimonials from your actual clients
- Market insights with current data

Then re-run the import script or manually enter the updated data.
