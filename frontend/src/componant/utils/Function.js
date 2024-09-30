import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import FetchData from '../../componant/fetch-api/Apifetch';
import { BUSINESS_URL, APPURL, BASE_URL } from '../utils/ApiRoute';
import { useNavigate, useNavigation } from 'react-router-dom';
const User = JSON.parse(localStorage.getItem("VERIFYDATA"))

export const sortT = (i, setdataList, datalist, sortDirection, setSortDirection) => {

  const newData = [...datalist];
  const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  newData.sort((a, b) => {
    const x = a[Object.keys(a)[i]];
    const y = b[Object.keys(b)[i]];
    if (sortDirection === 'asc') {
      return x.localeCompare(y);
    } else {
      return y.localeCompare(x);
    }
  });
  setdataList(newData);
  setSortDirection(newSortDirection);
};

export const TimeFormat = (timeString) => {
  // Check if the timeString already contains AM/PM
  const is12HourFormat = timeString.toLowerCase().includes('am') || timeString.toLowerCase().includes('pm');

  // Extract the time portion without seconds for 12-hour format
  let [timePart, meridian] = timeString.split(' ');
  let [hours, minutes] = timePart.split(":");

  // If it's already in 12-hour format, return the time without seconds
  if (is12HourFormat) {
    return `${hours}:${minutes.padStart(2, "0")} ${meridian.toUpperCase()}`;
  }

  // Otherwise, parse it as 24-hour time and convert to 12-hour format
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  // Return formatted time without seconds
  return `${hour}:${minutes.padStart(2, "0")} ${ampm}`;
};


export const validateForm = (data) => {
  var newErrors = {};
  for (const key in data) {
    const value = data[key];
    const trimmedValue = value && typeof value === 'string' ? value.trim() : value;
    if (!trimmedValue) {
      newErrors[key] = `${key} is required`;
    }
  }
  return Object.keys(newErrors).length === 0;
};

export const SkipButton = async () => {
  var Userdata = JSON.parse(localStorage.getItem("VERIFYDATA"));
  if (!Userdata) {
    Userdata = (JSON.parse(localStorage.getItem("LOGINDATA"))?.user);
  }
  const res = await FetchData("detail/user/" + Userdata._id, 'GET', null, true, false);
  if (res.success) {
    // if (res.data.user.user_type === '1') {
    //   window.location.href = BUSINESS_URL + "?user_id=" + res.data.user._id;
    // } else {
    console.log(res.data);

    localStorage.removeItem("VERIFYDATA")
    localStorage.setItem("LOGINDATA", JSON.stringify(res.data))
    if (res.data.user?.first_login == 0) {
      window.location.href = '/suggestions';
    }else {
      window.location.href = '/feed-page';
    }
    // }
  }
};
export const updateData = async () => {
  var Userdata = JSON.parse(localStorage.getItem("VERIFYDATA"));
  if (!Userdata) {
    Userdata = (JSON.parse(localStorage.getItem("LOGINDATA"))?.user);
  }
  const res = await FetchData("detail/user/" + Userdata._id, 'GET', null, true, false);
  if (res.success) {
    localStorage.removeItem("VERIFYDATA")
    localStorage.setItem("LOGINDATA", JSON.stringify(res.data))
  }
};

export const checkBusinessInfo = () => {
  var getData = JSON.parse(localStorage.getItem("LOGINDATA"));
  const { user, BusinessInfoData, License, BankInfoData } = getData;

  if (!BusinessInfoData[0].company_name && !License.AddressProof) {

    return false;
  }
  else {
    return true;
  }
}

export const capitalizeFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export const FormatDateDifference = (dateString) => {
  const then = new Date(dateString);
  const now = new Date();
  const diffMs = Math.abs(now - then);

  // Define units and their corresponding milliseconds
  const units = [
    { label: 'y', milliseconds: 31536000000 }, // Year
    { label: 'w', milliseconds: 604800000 },    // Week
    { label: 'd', milliseconds: 86400000 },        // Day
    { label: 'h', milliseconds: 3600000 },         // Hour
    { label: 'm', milliseconds: 60000 },           // Minute
  ];

  // Find the appropriate unit based on the difference
  for (const unit of units) {
    if (diffMs >= unit.milliseconds) {
      const value = Math.floor(diffMs / unit.milliseconds);
      return `${value}${unit.label} `;
    }
  }

  // If no unit is applicable, return 'Just now'
  return 'Just now';
}

export const FormatCommentDateDifference = (dateString) => {
  const then = new Date(dateString);
  const now = new Date();
  const diffMs = Math.abs(now - then);

  // Define units and their corresponding milliseconds
  const units = [
    { label: 'y', milliseconds: 31536000000 }, // Year
    { label: 'w', milliseconds: 604800000 },    // Week
    { label: 'd', milliseconds: 86400000 },        // Day
    { label: 'h', milliseconds: 3600000 },         // Hour
    { label: 'min', milliseconds: 60000 },           // Minute
  ];
  for (const unit of units) {
    if (diffMs >= unit.milliseconds) {
      const value = Math.floor(diffMs / unit.milliseconds);
      const label = value === 1 ? unit.label : `${unit.label}`; // Add 's' for plural form
      return `${value}${label} ago`;
    }
  }

  // If no unit is applicable, return 'Just now'
  return 'now';
}


export const CheckGuest = () => {
  const token = JSON.parse(localStorage.getItem("LOGINDATA"));
  if (!token?.user?._id) {
    // Swal.fire({
    //   title: 'Login Required!',
    //   html: '<span style="font-size: 16px; font-weight: bold;">Login to continue</span>',
    //   icon: 'info',
    //   showCancelButton: true,
    //   confirmButtonColor: '#4535C1',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Login',
    //   cancelButtonText: 'Not now',
    //   customClass: {
    //     confirmButton: 'swal2-confirm-custom',
    //     cancelButton: 'swal2-cancel-custom',
    //     title:'swal2-title',
    //   },
    //   // iconHtml: '<img src="images/icons/shutdown.png" style="width: 60px; height: 60px; border:"none" border-radius: 50%;" />',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     localStorage.removeItem('VERIFYDATA');
    //     localStorage.removeItem("LOGINDATA");
    //     window.location.href = APPURL+"/login";
    //   }
    // });  
    return true;
  }
  return false;
}


export const RedirectRoute = (route) => {
  window.location.href = `${route}`
}

export const handleImageError = (event) => {
  event.target.src = `/images/profile/img00.png`; // path to your default image
};
export const handleImagePageError = (event) => {
  event.target.src = `/images/profile/businessplace.png`; // path to your default image
};

export const linkify = (text) => {
  const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text?.replace(urlPattern, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" className="fonttext font-weight-1">${url}</a>`;
  });
};

export const Linkcheck = ({ content, rtl }) => {
  // Use the linkify function to convert text to HTML with links
  const linkedContent = linkify(content);

  return (
    // <div dangerouslySetInnerHTML={{ __html: linkedContent }} />
    <div className='font-weight-normal fontsubtitle' style={{ direction: rtl ? 'rtl' : 'ltr', textAlign: rtl ? 'right' : 'left' }} dangerouslySetInnerHTML={{ __html: linkedContent }} />

  );
};


export const CheckTick = (user_id) => {
  if (user_id?.toString() == "666c2357feb90763e5f9ba68") {
    
    return (
      <img src="\images\icons\badge.png" alt=""
        style={{ width: "15px", height: "15px" }}
      />
    )
  } else {
 
    return
  }
}
export const truncateMiddle = (str, width) => {
  const ellipsis = '...';
  const len = str.length;
  const charsToShow = width / 10; // adjust this value based on your font size and width
  const start = Math.floor(charsToShow / 1.5);
  const end = len - Math.ceil(charsToShow / 2);

  if (len > charsToShow) {
    return `${str.substring(0, start)}${ellipsis}${str.substring(end)}`;
  }
  return str;
}

export const Imagesource = (item) => {

  const isAbsoluteUrl = item?.startsWith('http://') || item?.startsWith('https://');
  if (isAbsoluteUrl) {
    item = item.split('=')[0];
  }
  return isAbsoluteUrl ? item : BASE_URL + item


}

export const slugify = (str) => {
  return str?.toLowerCase().replace(/\s+/g, '@');
};
export const deslugify = (str) => {
  return str?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l?.toUpperCase());
};
export const determineType = (url) => {
  if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif')) {
    return 'image';
  } else if (url.endsWith('.pdf')) {
    return 'pdf';
  }
  return 'other'; // Default type if neither image nor pdf
};


export const CheckGICTC = async (GICTCText) => {
  try {
    const res = await FetchData("check_code/" + GICTCText, "GET", null, null);
    if (res?.success) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false
  }
}

export const Splittext = (text, num = 10) => {
  const data = text.split(' ').slice(0, num).join(' ');
  return data;
}
