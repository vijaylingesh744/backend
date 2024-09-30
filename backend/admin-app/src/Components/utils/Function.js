import "../Screens/user/user.css"

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
  const [hours, minutes, seconds] = timeString.split(":");
  let hour = parseInt(hours);
  const meridian = hour >= 12 ? "PM" : "AM";
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  const formattedTime = `${hour}:${minutes.padStart(2, "0")} ${meridian}`;

  return formattedTime;
}

export const validateForm = (data) => {
  var newErrors = {};
  for (const key in data) {
    console.log("data",data[key])
      if (!data[key].trim()) {
          newErrors[key] = `${key} is required`;
      }
  }
  return Object.keys(newErrors).length === 0;
};
export const LoaderSpin = ()=>{
  return (
      <div className="loadingOverlay">
          <div class="loading-spinner"> </div>
      </div>
  )
}