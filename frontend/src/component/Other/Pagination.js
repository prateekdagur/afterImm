import React, { useState, useEffect } from "react";

//pagination on pages
const Pagination = () => {
	const [totalPages, setTotalPages] = useState(8);
	const [currentBtn, setCurrentBtn] = useState(1);
	const [arrOfCurrBtn, setArrOfCurrBtn] = useState([]);
	const pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}
	useEffect(() => {
		let tempNumberOfPages = [...arrOfCurrBtn];
		let dotsInitial = "...";
		let dotsLeft = "... ";
		let dotsRight = " ...";
		if (pages.length < 6) {
			tempNumberOfPages = pages;
		} else if (currentBtn >= 1 && currentBtn <= 3) {
			tempNumberOfPages = [1, 2, 3, 4, dotsInitial, pages.length];
		} else if (currentBtn === 4) {
			const sliced = pages.slice(0, 5);
			tempNumberOfPages = [...sliced, dotsInitial, pages.length];
		} else if (currentBtn > 4 && currentBtn < pages.length - 2) {
			const sliced1 = pages.slice(currentBtn - 2, currentBtn);
			const sliced2 = pages.slice(currentBtn, currentBtn + 1);
			tempNumberOfPages = [
				1,
				dotsLeft,
				...sliced1,
				...sliced2,
				dotsRight,
				pages.length,
			];
		} else if (currentBtn > pages.length - 3) {
			const sliced = pages.slice(pages.length - 4);
			tempNumberOfPages = [1, dotsLeft, ...sliced];
		} else if (currentBtn === dotsInitial) {
			setCurrentBtn(arrOfCurrBtn[arrOfCurrBtn.length - 3] + 1);
		} else if (currentBtn === dotsRight) {
			setCurrentBtn(arrOfCurrBtn[3] + 2);
		} else if (currentBtn === dotsLeft) {
			setCurrentBtn(arrOfCurrBtn[3] - 2);
		}
		setArrOfCurrBtn(tempNumberOfPages);
	}, [currentBtn]);

	return (
		<div>
			<div className="pagintn">
				<div className="pagination">
					<p
						className=""
						onClick={() =>
							setCurrentBtn((prev) => (prev === 1 ? prev : prev - 1))
						}>
						&laquo;
					</p>
					{arrOfCurrBtn.map((page, index) => (
						<p
							key={index}
							className={currentBtn === page ? "active" : ""}
							onClick={() => setCurrentBtn(page)}>
							{page}
						</p>
					))}
					<p
						onClick={() =>
							setCurrentBtn((prev) => (prev === pages.length ? prev : prev + 1))
						}>
						&raquo;
					</p>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
