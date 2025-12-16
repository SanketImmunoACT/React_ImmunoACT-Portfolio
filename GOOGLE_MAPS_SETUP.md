# Google Maps API Setup Guide

## Getting Your Google Maps API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create or Select a Project**
   - Create a new project or select an existing one

3. **Enable Required APIs**
   - Go to "APIs & Services" > "Library"
   - Search for and enable:
     - Maps JavaScript API
     - Places API (optional, for enhanced features)

4. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

5. **Secure Your API Key (Recommended)**
   - Click on your API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain(s):
     - `localhost:*` (for development)
     - `yourdomain.com/*` (for production)

6. **Add to Environment Variables**
   - Open your `.env` file
   - Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyC4R6AN7SmxjPUIGKdyBDReiQpMVMvSqNg
   ```

## Testing the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/partnered-hospitals`

3. You should see:
   - Interactive Google Map centered on India
   - Hospital markers with custom icons
   - Clickable info windows with hospital details
   - Hospital list on the left side
   - Search and filter functionality

## Troubleshooting

- **Map not loading**: Check if your API key is correct and the Maps JavaScript API is enabled
- **Markers not showing**: Ensure hospital coordinates are valid
- **Console errors**: Check browser console for specific error messages

## Features Included

- ✅ Interactive Google Maps
- ✅ Custom hospital markers
- ✅ Info windows with hospital details
- ✅ Search functionality
- ✅ State and type filters
- ✅ Responsive design
- ✅ "Get Directions" integration
- ✅ Hospital list sidebar
- ✅ Click to focus on hospital

## Next Steps

Once you provide the hospital data with coordinates, I'll:
1. Replace the sample data with your actual hospital list
2. Adjust the map center and zoom based on your hospital locations
3. Fine-tune the styling and functionality as needed