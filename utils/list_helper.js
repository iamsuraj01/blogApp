const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totLikes = blogs.reduce((previousValue, currentValue) => {
    previousValue += currentValue.likes;
    return previousValue;
  }, 0);
  return totLikes;
};

const favouriteBlog = (blogs) => {
  const mostliked = blogs.reduce((previousValue, currentValue) => {
    if (blogs.length === 1) {
      previousValue = {
        title: currentValue.title,
        author: currentValue.author,
        likes: currentValue.likes,
      };
    }
    if (previousValue.likes >= currentValue.likes) {
      previousValue = {
        title: previousValue.title,
        author: previousValue.author,
        likes: previousValue.likes,
      };
    } else {
      previousValue = {
        title: currentValue.title,
        author: currentValue.author,
        likes: currentValue.likes,
      };
    }
    console.log(previousValue);
    return previousValue;
  }, {});
  return mostliked;
};
const mostBlogs = (blogs) => {
  if (!blogs.length) return null;

  const hashMap = {};

  blogs.forEach((blog) => {
    if (!hashMap[blog.author]) {
      hashMap[blog.author] = 1;
    } else {
      hashMap[blog.author]++;
    }
  });

  let authorWithMostBlogs = Object.keys(hashMap).reduce((a, b) =>
    hashMap[a] > hashMap[b] ? a : b
  );

  return { author: authorWithMostBlogs, blogs: hashMap[authorWithMostBlogs] };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return null;
  const hashMap = {};
  blogs.forEach((blog) => {
    if (!hashMap[blog.author]) {
      hashMap[blog.author] = blog.likes;
    } else {
      hashMap[blog.author] += blog.likes;
    }
  });

  let authorWithMostLikes = Object.keys(hashMap).reduce((a, b) =>
    hashMap[a] > hashMap[b] ? a : b
  );

  return { author: authorWithMostLikes, likes: hashMap[authorWithMostLikes] };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
