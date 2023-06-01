export const timeSince = (date) => {
  const now = new Date();
  const publishedTime = new Date(date);
  const secondsPast = (now.getTime() - publishedTime.getTime()) / 1000;

  if (secondsPast < 60) {
    return parseInt(secondsPast) + ' seconds ago';
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + ' minutes ago';
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + ' hours ago';
  }
  if (secondsPast > 86400) {
    let day = publishedTime.getDate();
    let month = publishedTime.getMonth() + 1;
    let year = publishedTime.getFullYear();
    return parseInt(secondsPast / 86400) + ' days ago';
  }
};
