export function IsAdmin(): boolean {
  const roles = JSON.parse(localStorage.getItem("roles"));
  if (!roles.length) return false;
  if (roles[0].authority == "AUTH_ADMIN") return true;
  else return false;
}
