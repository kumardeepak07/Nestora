import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./Home_Icon.png"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./Home_Icon.png"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import main_car from "./villa_home.png"
import banner_car_image from "./banner_logo.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import car_image1 from "./villa1.jpg"
import car_image2 from "./villa2.jpg"
import car_image3 from "./villa3.jpg"
import car_image4 from "./villa4.jpg"
import nestora_image from "./nestora-logo.svg";

export const cityList = ['New York', 'Los Angeles', 'Houston', 'Chicago']

export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    main_car,
    banner_car_image,
    car_image1,
    upload_icon,
    user_profile,
    car_image2,
    car_image3,
    car_image4,
    nestora_image
}

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "My Bookings", path: "/my-bookings" },
]

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add Property", path: "/owner/add-property", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Properties", path: "/owner/manage-property", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "GreatStack",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}

export const dummyPropertyData = [
    {
        "_id": "67ff5bc069c03d4e45f30b77",
        "title": "ITC Maurya",
        "description": "Luxe Property",
        "image": car_image1,
        "property_type" : "Luxury",
        "currency": "",
        "daily_price": 10000,
        "monthly_price": 150000,
        "isAvaliable": true,
        "category" : "Villa",
        "total_rooms_available": 100,
        "room_capacity": 3,
        "modeisSwimmingPoolAvailablel": true,
        "isGymAvailable": true,
        "hospital_distance": "2.5 km",
        "airport_distance": "5 km",
        "createdAt": "2025-04-16T07:26:56.215Z",
    },
    {
        "_id": "67ff5bc069c03d4e45f30b78",
        "title": "ITC Maurya",
        "description": "Luxe Property",
        "image": car_image2,
        "property_type" : "Luxury",
        "currency": "",
        "daily_price": 10000,
        "monthly_price": 150000,
        "isAvaliable": true,
        "category" : "Villa",
        "total_rooms_available": 100,
        "room_capacity": 3,
        "modeisSwimmingPoolAvailablel": true,
        "isGymAvailable": true,
        "hospital_distance": "2.5 km",
        "airport_distance": "5 km",
        "createdAt": "2025-04-16T07:26:56.215Z",
    },
    {
        "_id": "67ff5bc069c03d4e45f30b79",
        "title": "ITC Maurya",
        "description": "Luxe Property",
        "image": car_image1,
        "property_type" : "Luxury",
        "currency": "",
        "daily_price": 10000,
        "monthly_price": 150000,
        "isAvaliable": true,
        "category" : "Villa",
        "total_rooms_available": 100,
        "room_capacity": 3,
        "modeisSwimmingPoolAvailablel": true,
        "isGymAvailable": true,
        "hospital_distance": "2.5 km",
        "airport_distance": "5 km",
        "createdAt": "2025-04-16T07:26:56.215Z",
    },
    {
        "_id": "67ff5bc069c03d4e45f30b80",
        "title": "ITC Maurya",
        "description": "Luxe Property",
        "image": car_image1,
        "property_type" : "Luxury",
        "currency": "",
        "daily_price": 10000,
        "monthly_price": 150000,
        "isAvaliable": true,
        "category" : "Villa",
        "total_rooms_available": 100,
        "room_capacity": 3,
        "modeisSwimmingPoolAvailablel": true,
        "isGymAvailable": true,
        "hospital_distance": "2.5 km",
        "airport_distance": "5 km",
        "createdAt": "2025-04-16T07:26:56.215Z",
    }
];

export const dummyMyBookingsData = [
    {
        "_id": "68482bcc98eb9722b7751f70",
        "car": dummyPropertyData[0],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-13T00:00:00.000Z",
        "returnDate": "2025-06-14T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T12:57:48.244Z",
    },
    {
        "_id": "68482bb598eb9722b7751f60",
        "car": dummyPropertyData[1],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-12T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 130,
        "createdAt": "2025-06-10T12:57:25.613Z",
    },
    {
        "_id": "684800fa0fb481c5cfd92e56",
        "car": dummyPropertyData[2],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 600,
        "createdAt": "2025-06-10T09:55:06.379Z",
    },
    {
        "_id": "6847fe790fb481c5cfd92d94",
        "car": dummyPropertyData[3],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T09:44:25.410Z",
    }
]

export const dummyDashboardData = {
    "totalCars": 4,
    "totalBookings": 2,
    "pendingBookings": 0,
    "completedBookings": 2,
    "recentBookings": [
        dummyMyBookingsData[0],
        dummyMyBookingsData[1]
    ],
    "monthlyRevenue": 840
}