const listHelper = require("../utils/list_helper");

describe("total likes", () => {
	// const listWithOneBlog = [
	//     {
	//       _id: '5a422aa71b54a676234d17f8',
	//       title: 'Go To Statement Considered Harmful',
	//       author: 'Edsger W. Dijkstra',
	//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
	//       likes: 5,
	//       __v: 0
	//     }
	//   ]
	test("of empty list is zero", () => {
		const blogs = [];
		expect(listHelper.totalLikes(blogs)).toBe(0);
	});

	test("when list has only 1 blog equals the like of that", () => {
		const blogs = [{ likes: 20 }];
		expect(listHelper.totalLikes(blogs)).toBe(20);
	});

	test("of a bigger list is calculated right", () => {
		const blogs = [{ likes: 20 }, { likes: 10 }, { likes: 20 }];
		expect(listHelper.totalLikes(blogs)).toBe(50);
	});
});
