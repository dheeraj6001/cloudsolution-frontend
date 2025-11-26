export default function getVendor() {
 
  const host = window.location.origin;

  if (host.includes("examrankers.com")) {
    return { id: "theme1", theme: "theme1" };
  }
  if (host.includes("vendor2.com")) {
    return { id: "vendor2", theme: "theme2" };
  }
  if (host.includes("vendor3.com")) {
    return { id: "vendor3", theme: "theme3" };
  }

  if (window.location.hostname.includes("localhost")) {
    return { id: "psofts", theme: "psofts" };
  }
  return { id: "psofts", theme: "psofts" };
}
