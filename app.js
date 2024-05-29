const formdata = document.getElementById("formdata");
const main = document.querySelector(".main");

formdata.addEventListener("submit", async (e) => {
  e.preventDefault();
  main.classList.add("loading"); // Add loading class to main element
  const data = new FormData(e.target);
  const maindata = Object.fromEntries(data);
  const { name, email, number, password } = maindata;

  if (!name || !email || !number || !password) {
    main.innerHTML = `
        <p class="bg-red-300 px-3 py-4 rounded-sm">All Fields Are Required!</p>
    `;
    main.classList.remove("loading"); // Remove loading class
  } else if (!isEmail(email)) {
    main.innerHTML = `
        <p class="bg-yellow-300 px-3 py-4 rounded-sm">Email Not Match!</p>
    `;
    main.classList.remove("loading"); // Remove loading class
  } else if (isMobile) {
  } else {
    sendDataLS(
      "User",
      JSON.stringify({
        name,
        email,
        number,
        password,
      })
    );
  }
});

const isEmail = (email) => {
  const pattern = /^[a-z0-9\._]{1,}@[a-z0-9]{2,}\.[a-z]{2,4}$/;
  return pattern.test(email);
};

// Other functions remain unchanged...

const isMobile = (mobile) => {
  const pattern = /^(\+8801|8801|01)[0-9]{9}$/;
  return pattern.test(mobile);
};

const createID = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  const machineId = "xxxxxxxxxxxx".replace(/[x]/g, function () {
    return ((Math.random() * 16) | 0).toString(16);
  });
  const processId = (Math.floor(Math.random() * 1000) % 1000)
    .toString(16)
    .padStart(3, "0");
  const counter = ((Math.random() * 16777216) | 0)
    .toString(16)
    .padStart(6, "0");

  return timestamp + machineId + processId + counter;
};

const timeSayed = (postDate) => {
  const currentDate = new Date();
  const diff = currentDate - postDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

const getDataLS = (key) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};

const sendDataLS = (key, stdData) => {
  const data = localStorage.getItem(key);

  let lsData;
  if (data) {
    lsData = JSON.parse(data);
  } else {
    lsData = [];
  }

  lsData.push(stdData);

  localStorage.setItem(key, JSON.stringify(lsData));
};
