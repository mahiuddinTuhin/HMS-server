/* Function to generate combination of password */
export function generatePassword(length = 12) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+{}[]|;:,.<>?";

  const allChars = lowercase + uppercase + numbers + specialChars;

  let password = "";

  // Ensure at least one character from each category
  const randomLower = lowercase[Math.floor(Math.random() * lowercase.length)];
  const randomUpper = uppercase[Math.floor(Math.random() * uppercase.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const randomSpecial =
    specialChars[Math.floor(Math.random() * specialChars.length)];

  password += randomLower + randomUpper + randomNumber + randomSpecial;

  // Generate the remaining characters
  for (let i = 4; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Shuffle the password to ensure the mandatory characters aren't always at the beginning
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}
