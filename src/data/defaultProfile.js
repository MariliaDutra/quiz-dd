export const STORAGE_KEY = "carteirinha-profile";

export const defaultProfile = {
  name: "Seu Nome",
  course: "Seu Curso",
  idNumber: "0000000",
  birthDate: "",
  validity: "",
  photo: null,
  logoLeft: null,
};

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
