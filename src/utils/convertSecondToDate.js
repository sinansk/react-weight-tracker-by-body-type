export const convertSecondsToDate = (seconds) => {
  const date = new Date(seconds * 1000); // Epoch zamanını milisaniyeye çevirerek Date nesnesi oluşturun

  const day = date.getDate(); // Gün değerini alın (1-31 arası)
  const month = date.getMonth() + 1; // Ay değerini alın (0-11 arası, +1 ekleyerek 1-12 arası yapın)
  const year = date.getFullYear(); // Yıl değerini alın

  // Elde edilen değerleri birleştirerek tarih dizesi oluşturun
  const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  return formattedDate;
};

// Kullanım örneği:
const seconds = 1625083200; // Örnek olarak 30 Haziran 2021 tarihini temsil eden bir Epoch zamanı (saniye cinsinden)
const formattedDate = convertSecondsToDate(seconds);
console.log(formattedDate); // Çıktı: 30-06-2021