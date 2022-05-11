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
	const mostBlogsAuthor = blogs.reduce((previousValue, currentValue) => {}, {});
};
module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
};
