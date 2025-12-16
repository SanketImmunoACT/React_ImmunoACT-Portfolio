# Testing the Partnered Hospitals Page

## ✅ What's Been Implemented

### 1. **Complete Page Structure**
- Hero section with gradient background
- Interactive Google Maps integration
- Hospital list with search and filters
- Collaboration form with validation

### 2. **Google Maps Features**
- Custom hospital markers with medical cross icons
- Info windows with hospital details
- "Get Directions" button
- Map focus on selected hospitals
- Responsive design

### 3. **Hospital Management**
- Search functionality (by name, city, address)
- Filter by state and hospital type
- Real-time filtering
- Hospital list sidebar
- Click to focus map view

### 4. **Collaboration Form**
- Complete form validation using React Hook Form + Yup
- Same validation schema as Contact page
- Success/error states
- Character counter for message field
- Honeypot spam protection
- GDPR-compliant consent checkbox

## 🧪 How to Test

### 1. **Access the Page**
- Development server is running at: http://localhost:5174/
- Navigate to: http://localhost:5174/partnered-hospitals

### 2. **Test Map Features**
- View the interactive map centered on India
- Click on hospital markers to see info windows
- Click "Get Directions" to open Google Maps
- Click on hospitals in the list to focus the map

### 3. **Test Search & Filters**
- Use the search box to find hospitals
- Filter by state (Maharashtra)
- Filter by type (Government/Private)
- Check the counter showing filtered results

### 4. **Test Collaboration Form**
- Scroll to the bottom "Collaborate with Us" section
- Try submitting empty form (validation should trigger)
- Fill out the form with valid data
- Test character counter in message field
- Test form submission

## 🔧 Next Steps

### 1. **Google Maps API Setup**
- Get your Google Maps API key from Google Cloud Console
- Add it to your `.env` file:
  ```
  VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
  ```

### 2. **Replace Sample Data**
- Currently showing 3 sample hospitals in Mumbai
- Provide your hospital list with:
  - Hospital names
  - Full addresses
  - Phone numbers
  - Email addresses
  - Coordinates (lat/lng)
  - City/State
  - Type (Government/Private)

### 3. **Backend Integration**
- Form submits to `/api/v1/contact/submit` endpoint
- Includes `formType: 'collaboration'` to distinguish from contact form
- Uses same validation as Contact page

## 🎨 UI Consistency

- ✅ Same color scheme (orange/yellow) as other pages
- ✅ Same form styling as Contact page
- ✅ Same validation patterns and error messages
- ✅ Responsive design for mobile/desktop
- ✅ Consistent typography and spacing

## 📱 Responsive Features

- Mobile-friendly map interface
- Collapsible hospital list on mobile
- Touch-friendly form inputs
- Responsive grid layouts

The page is ready for your hospital data! Once you provide the coordinates and details, I'll update the sample data and the page will be fully functional.