// Utility to process hospital data from CSV and add coordinates
// This script processes the hospital names and extracts location information

const hospitalList = [
  "A.J. Hospital & Research Centre, Mangalore",
  "Aakash Healthcare Super Speciality Hospital, Dwarka, New Delhi",
  "Jaslok Hospital and Research Centre, Mumbai",
  "Action Cancer Hospital, Paschim Vihar, New Delhi",
  "Advanced Centre for Treatment, Research and Education in Cancer (ACTREC), Tata Memorial Centre, Navi Mumbai",
  "Cancer Institute (WIA), Adyar, Chennai",
  "AIG Hospitals, Gachibowli",
  "All India Institute of Medical Sciences, Bhopal",
  "All India Institute of Medical Sciences, New Delhi",
  "All India Institute of Medical Sciences, Nagpur",
  "All India Institute of Medical Sciences, Raipur",
  "All India Institute of Medical Sciences, Bhubaneswar",
  "All India Institute of Medical Sciences, Guwahati",
  "All India Institute of Medical Sciences, Patna",
  "Akash Healthcare Super Speciality Hospital, Dwarka, New Delhi",
  "Amala Institute of Medical Sciences, Thrissur",
  "American Oncology Institute, Hyderabad",
  "American Oncology Institute, Vijayawada",
  "Amrita Hospital, Faridabad",
  "Amrita Institute of Medical Sciences, Kochi",
  "Andhra Hematology & Bone Marrow Transplant Centre, Visakhapatnam",
  "American Oncology Institute, Nagpur",
  "Apex Hospitals, Jaipur",
  "Apollo Hospitals, Bannerghatta Road, Bangalore",
  "Apollo Hospitals, Bhubaneswar",
  "Apollo Cancer Centre, Madurai",
  "Apollo Cancer Centre, Navi Mumbai",
  "Apollo Cancer Centre, Teynampet, Chennai",
  "Apollo CBCC Cancer Care, Gandhinagar",
  "Apollo Excelcare Hospital, Guwahati",
  "Apollo Hospitals, Greams Road, Chennai",
  "Apollo Hospitals, Indore",
  "Apollo Hospitals, Bannerghatta Road, Bengaluru",
  "Apollo Gleneagles Hospitals, Kolkata",
  "Apollo Hospitals, Navi Mumbai",
  "Apollo Hospitals, Visakhapatnam",
  "Apollo Hospitals, Health City, Arilova, Visakhapatnam",
  "Apollo Hospitals, Bengaluru",
  "Apollo Hospitals, Gandhinagar",
  "Apollo Hospitals, Jubilee Hills, Hyderabad",
  "Indraprastha Apollo Hospitals, New Delhi",
  "Apollo Proton Cancer Centre, Chennai",
  "Apollo SAGE Hospitals, Bhopal",
  "Apollo BGS Hospital, Mysuru",
  "ApolloMedics Super Speciality Hospital, Lucknow"
];

// Function to extract city and state from hospital name
const extractLocationInfo = (hospitalName) => {
  const parts = hospitalName.split(', ');
  let city = '';
  let state = '';
  let name = hospitalName;

  if (parts.length >= 2) {
    const lastPart = parts[parts.length - 1];
    const secondLastPart = parts[parts.length - 2];
    
    // Common city-state patterns
    const cityStateMap = {
      'New Delhi': { city: 'New Delhi', state: 'Delhi' },
      'Mumbai': { city: 'Mumbai', state: 'Maharashtra' },
      'Bangalore': { city: 'Bangalore', state: 'Karnataka' },
      'Bengaluru': { city: 'Bengaluru', state: 'Karnataka' },
      'Chennai': { city: 'Chennai', state: 'Tamil Nadu' },
      'Kolkata': { city: 'Kolkata', state: 'West Bengal' },
      'Hyderabad': { city: 'Hyderabad', state: 'Telangana' },
      'Pune': { city: 'Pune', state: 'Maharashtra' },
      'Ahmedabad': { city: 'Ahmedabad', state: 'Gujarat' },
      'Jaipur': { city: 'Jaipur', state: 'Rajasthan' },
      'Lucknow': { city: 'Lucknow', state: 'Uttar Pradesh' },
      'Bhopal': { city: 'Bhopal', state: 'Madhya Pradesh' },
      'Indore': { city: 'Indore', state: 'Madhya Pradesh' },
      'Nagpur': { city: 'Nagpur', state: 'Maharashtra' },
      'Kochi': { city: 'Kochi', state: 'Kerala' },
      'Coimbatore': { city: 'Coimbatore', state: 'Tamil Nadu' },
      'Visakhapatnam': { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
      'Bhubaneswar': { city: 'Bhubaneswar', state: 'Odisha' },
      'Guwahati': { city: 'Guwahati', state: 'Assam' },
      'Patna': { city: 'Patna', state: 'Bihar' },
      'Raipur': { city: 'Raipur', state: 'Chhattisgarh' },
      'Thrissur': { city: 'Thrissur', state: 'Kerala' },
      'Vijayawada': { city: 'Vijayawada', state: 'Andhra Pradesh' },
      'Faridabad': { city: 'Faridabad', state: 'Haryana' },
      'Mangalore': { city: 'Mangalore', state: 'Karnataka' },
      'Madurai': { city: 'Madurai', state: 'Tamil Nadu' },
      'Mysuru': { city: 'Mysuru', state: 'Karnataka' },
      'Mysore': { city: 'Mysore', state: 'Karnataka' },
      'Gandhinagar': { city: 'Gandhinagar', state: 'Gujarat' },
      'Navi Mumbai': { city: 'Navi Mumbai', state: 'Maharashtra' },
      'Gurugram': { city: 'Gurugram', state: 'Haryana' },
      'Noida': { city: 'Noida', state: 'Uttar Pradesh' },
      'Chandigarh': { city: 'Chandigarh', state: 'Chandigarh' },
      'Ludhiana': { city: 'Ludhiana', state: 'Punjab' },
      'Surat': { city: 'Surat', state: 'Gujarat' },
      'Dehradun': { city: 'Dehradun', state: 'Uttarakhand' },
      'Vellore': { city: 'Vellore', state: 'Tamil Nadu' },
      'Thiruvananthapuram': { city: 'Thiruvananthapuram', state: 'Kerala' },
      'Kozhikode': { city: 'Kozhikode', state: 'Kerala' },
      'Calicut': { city: 'Calicut', state: 'Kerala' },
      'Thalassery': { city: 'Thalassery', state: 'Kerala' },
      'Kottayam': { city: 'Kottayam', state: 'Kerala' },
      'Thiruvalla': { city: 'Thiruvalla', state: 'Kerala' },
      'Secunderabad': { city: 'Secunderabad', state: 'Telangana' },
      'Mohali': { city: 'Mohali', state: 'Punjab' },
      'Panchkula': { city: 'Panchkula', state: 'Haryana' },
      'Rohini': { city: 'Rohini', state: 'Delhi' },
      'Dwarka': { city: 'Dwarka', state: 'Delhi' },
      'Vasant Kunj': { city: 'Vasant Kunj', state: 'Delhi' },
      'Shalimar Bagh': { city: 'Shalimar Bagh', state: 'Delhi' },
      'Paschim Vihar': { city: 'Paschim Vihar', state: 'Delhi' },
      'Anandapur': { city: 'Anandapur', state: 'West Bengal' },
      'Mulund': { city: 'Mulund', state: 'Maharashtra' },
      'Thane': { city: 'Thane', state: 'Maharashtra' },
      'Powai': { city: 'Powai', state: 'Maharashtra' },
      'Mahim': { city: 'Mahim', state: 'Maharashtra' },
      'Chembur': { city: 'Chembur', state: 'Maharashtra' },
      'Mira Road': { city: 'Mira Road', state: 'Maharashtra' },
      'Borivali': { city: 'Borivali', state: 'Maharashtra' },
      'Charni Road': { city: 'Charni Road', state: 'Maharashtra' },
      'Andheri': { city: 'Andheri', state: 'Maharashtra' },
      'Khar': { city: 'Khar', state: 'Maharashtra' },
      'Bannerghatta Road': { city: 'Bangalore', state: 'Karnataka' },
      'Yeshwanthpur': { city: 'Bangalore', state: 'Karnataka' },
      'HAL Road': { city: 'Bangalore', state: 'Karnataka' },
      'Old Airport Road': { city: 'Bangalore', state: 'Karnataka' },
      'Kengeri': { city: 'Bangalore', state: 'Karnataka' },
      'Greams Road': { city: 'Chennai', state: 'Tamil Nadu' },
      'Teynampet': { city: 'Chennai', state: 'Tamil Nadu' },
      'Adyar': { city: 'Chennai', state: 'Tamil Nadu' },
      'Jubilee Hills': { city: 'Hyderabad', state: 'Telangana' },
      'Gachibowli': { city: 'Hyderabad', state: 'Telangana' },
      'Hitech City': { city: 'Hyderabad', state: 'Telangana' },
      'Banjara Hills': { city: 'Hyderabad', state: 'Telangana' },
      'Somajiguda': { city: 'Hyderabad', state: 'Telangana' },
      'Arilova': { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
      'Health City': { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
      'Baner': { city: 'Pune', state: 'Maharashtra' },
      'Dona Paula': { city: 'Goa', state: 'Goa' },
      'Manipal': { city: 'Manipal', state: 'Karnataka' },
      'Jolly Grant': { city: 'Dehradun', state: 'Uttarakhand' },
      'Puducherry': { city: 'Puducherry', state: 'Puducherry' },
      'Srinagar': { city: 'Srinagar', state: 'Jammu and Kashmir' },
      'Trichy': { city: 'Tiruchirappalli', state: 'Tamil Nadu' },
      'Tiruchirappalli': { city: 'Tiruchirappalli', state: 'Tamil Nadu' },
      'Namakkal': { city: 'Namakkal', state: 'Tamil Nadu' },
      'Parumala': { city: 'Parumala', state: 'Kerala' },
      'Thodupuzha': { city: 'Thodupuzha', state: 'Kerala' },
      'Nandi Hills': { city: 'Nashik', state: 'Maharashtra' },
      'Nashik': { city: 'Nashik', state: 'Maharashtra' },
      'Rajkot': { city: 'Rajkot', state: 'Gujarat' },
      'Vaishali': { city: 'Vaishali', state: 'Uttar Pradesh' },
      'Patparganj': { city: 'Patparganj', state: 'Delhi' },
      'Saket': { city: 'Saket', state: 'Delhi' }
    };

    if (cityStateMap[lastPart]) {
      city = cityStateMap[lastPart].city;
      state = cityStateMap[lastPart].state;
      name = parts.slice(0, -1).join(', ');
    } else if (cityStateMap[secondLastPart]) {
      city = cityStateMap[secondLastPart].city;
      state = cityStateMap[secondLastPart].state;
      name = parts.slice(0, -2).join(', ');
    }
  }

  return { name, city, state };
};

// Function to determine hospital type
const getHospitalType = (hospitalName) => {
  const govKeywords = ['AIIMS', 'All India Institute', 'Government', 'Medical College', 'Command Hospital', 'ESIC', 'King George', 'Safdarjung', 'Army Hospital', 'Railway', 'State Cancer Institute'];
  const isGovernment = govKeywords.some(keyword => hospitalName.includes(keyword));
  return isGovernment ? 'Government' : 'Private';
};

// Approximate coordinates for major cities (you can replace with actual geocoding)
const cityCoordinates = {
  'New Delhi': { lat: 28.6139, lng: 77.2090 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Bengaluru': { lat: 12.9716, lng: 77.5946 },
  'Chennai': { lat: 13.0827, lng: 80.2707 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 },
  'Hyderabad': { lat: 17.3850, lng: 78.4867 },
  'Pune': { lat: 18.5204, lng: 73.8567 },
  'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
  'Jaipur': { lat: 26.9124, lng: 75.7873 },
  'Lucknow': { lat: 26.8467, lng: 80.9462 },
  'Bhopal': { lat: 23.2599, lng: 77.4126 },
  'Indore': { lat: 22.7196, lng: 75.8577 },
  'Nagpur': { lat: 21.1458, lng: 79.0882 },
  'Kochi': { lat: 9.9312, lng: 76.2673 },
  'Coimbatore': { lat: 11.0168, lng: 76.9558 },
  'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
  'Bhubaneswar': { lat: 20.2961, lng: 85.8245 },
  'Guwahati': { lat: 26.1445, lng: 91.7362 },
  'Patna': { lat: 25.5941, lng: 85.1376 },
  'Raipur': { lat: 21.2514, lng: 81.6296 },
  'Thrissur': { lat: 10.5276, lng: 76.2144 },
  'Vijayawada': { lat: 16.5062, lng: 80.6480 },
  'Faridabad': { lat: 28.4089, lng: 77.3178 },
  'Mangalore': { lat: 12.9141, lng: 74.8560 },
  'Madurai': { lat: 9.9252, lng: 78.1198 },
  'Mysuru': { lat: 12.2958, lng: 76.6394 },
  'Mysore': { lat: 12.2958, lng: 76.6394 },
  'Gandhinagar': { lat: 23.2156, lng: 72.6369 },
  'Navi Mumbai': { lat: 19.0330, lng: 73.0297 },
  'Gurugram': { lat: 28.4595, lng: 77.0266 },
  'Noida': { lat: 28.5355, lng: 77.3910 },
  'Chandigarh': { lat: 30.7333, lng: 76.7794 },
  'Ludhiana': { lat: 30.9010, lng: 75.8573 },
  'Surat': { lat: 21.1702, lng: 72.8311 },
  'Dehradun': { lat: 30.3165, lng: 78.0322 },
  'Vellore': { lat: 12.9165, lng: 79.1325 },
  'Thiruvananthapuram': { lat: 8.5241, lng: 76.9366 },
  'Kozhikode': { lat: 11.2588, lng: 75.7804 },
  'Calicut': { lat: 11.2588, lng: 75.7804 },
  'Thalassery': { lat: 11.7480, lng: 75.4900 },
  'Kottayam': { lat: 9.5916, lng: 76.5222 },
  'Thiruvalla': { lat: 9.3833, lng: 76.5733 },
  'Secunderabad': { lat: 17.5040, lng: 78.5476 },
  'Mohali': { lat: 30.7046, lng: 76.7179 },
  'Panchkula': { lat: 30.6942, lng: 76.8606 },
  'Thane': { lat: 19.2183, lng: 72.9781 },
  'Manipal': { lat: 13.3467, lng: 74.7926 },
  'Puducherry': { lat: 11.9416, lng: 79.8083 },
  'Srinagar': { lat: 34.0837, lng: 74.7973 },
  'Tiruchirappalli': { lat: 10.7905, lng: 78.7047 },
  'Namakkal': { lat: 11.2189, lng: 78.1677 },
  'Parumala': { lat: 9.3500, lng: 76.6000 },
  'Thodupuzha': { lat: 9.8944, lng: 76.7194 },
  'Nashik': { lat: 19.9975, lng: 73.7898 },
  'Rajkot': { lat: 22.3039, lng: 70.8022 },
  'Goa': { lat: 15.2993, lng: 74.1240 }
};

export { hospitalList, extractLocationInfo, getHospitalType, cityCoordinates };