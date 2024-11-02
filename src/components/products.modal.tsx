import {
	colors,
	primaryButtonStyle,
	sidebarIcon,
	sidebarLoginPromptContainer,
	sidebarStyles,
	sidebarStylesActive,
	sidebarToggle,
	sidebarToggleActive,
} from './styles';
import { FaAngleLeft } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getProductsByUser } from '../services/api';
import { AUTH_MODE } from '../App';
import { ProductDetail } from './product-detail';
import { Pagination } from './pagination';

const products = [
	{
		_id: '67248fcbf26a68fdb34763ed',
		product_title: "Lee Women's Sculpting Slim Fit Skinny Leg Jean",
		product_description:
			'Mid rise, slimming fit, skinny leg opening\n5-Pocket denim jean with simple embroidery on back pockets\nFeaturing fabric that stretches, sculpts and holds\nRise: 10.5 inches, leg opening: 11 inches, n: short: 28 inches, medium: 30 inches, long: 32 inches\nProduct Measurements were taken using size 10 medium. Please note that Measurements may vary by size.',
		product_price: '$33.91,$34.99',
		product_image_urls: [
			'https://m.media-amazon.com/images/I/71mJwPoaWVL._AC_SX522_.jpg',
			'https://m.media-amazon.com/images/I/31GVgJqEaJL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41uUcxuIdyL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41Ui6uKdW1L._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/51Tivw-DLUL._AC_SR38,50_.jpg',
		],
		product_rating: 4.3,
		product_url: 'https://www.amazon.com/LEE-Womens-Sculpting-Skinny-Nightingale/dp/B07B6D233D',
		user: '67248fbef26a68fdb34763ea',
	},
	{
		_id: '6724918cf26a68fdb34763f3',
		product_title: "Hanes Women's Raglan Sleeve Tee, Women’s Stretch Cotton Tee, Women’s Crewneck Tee",
		product_description:
			"QUALITY FABRIC - Hanes raglan sleeve tee is made from super soft cotton-rich fabric. The comfortable fabric offers move-with-you style you’re sure to love. (95% Cotton/ 5% Spandex Jersey)\nRAGLAN SLEEVES - This classic raglan sleeve style, this 3/4 sleeve tee is ideal for year-round wear.\nSCOOPNECK - A flattering design, this raglan sleeve tee is designed with a wide, feminine scoop neckline.\nFLATTERING FIT - Hanes raglan sleeve tee offers a shapely, flattering fit that skims your curves without clinging.\nMULTIPLE OPTIONS - More choices, more comfort. This raglan sleeve tee is available in an array of colors.\nCOLD WATER WASH - Hanes recommends machine washing this women's shirt in cold water to help reduce energy consumption.",
		product_price: '$12.81,$13.74',
		product_image_urls: [
			'https://m.media-amazon.com/images/I/715kxZl2uCL._AC_SX522_.jpg',
			'https://m.media-amazon.com/images/I/41Kg+RZQ8LL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41Rfs-EFwaL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41AUV-omIiL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41+LXY7XQhL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/51SoJjEWM-L._AC_SR38,50_.jpg',
		],
		product_rating: 4.2,
		product_url: 'https://www.amazon.com/Hanes-Womens-Stretch-Cotton-Raglan/dp/B01MYZ0SZR',
		user: '67248fbef26a68fdb34763ea',
	},
	{
		_id: '6724919af26a68fdb34763f7',
		product_title: 'Embroidered Baseball Cap for Women Men Adjustable Baseball Hat Black Baseball Cap Trucker Hat',
		product_description:
			"Comfortable material: embroidered baseball caps are made of soft and premium fabric, lightweight, breathable baseball hats are more soft and comfy close to head.\nBlack baseball cap: baseball hat for men women. classic curved brim hat, the hard top is not easily dented. without an inner lining. which have 6 breathable embroidered eyelets to keep you cool. travel hiking running workouts and outdoor activities all seasons\nAdjustable metal buckle: sports cap each hat has an adjustable alloy closure. so our black baseball cap can be adjusted into multiple sizes, baseball hats fitting most people with different head sizes. it has never been easier to find the perfect size hat for yourself!\nWide applicable occasion: Black baseball cap for women men designed in protecting from sunshine and wind, suitable for outdoor activities. as travel, fishing, climbing, hiking, running, biker, walking, boating, going on trip, and so on all outdoor activities. womens ball cap, ball caps for men, mens caps, unisex.\nGift for men women: sports hat unisex baseball cap on new years, christmas, thanksgiving, valentine's day mother's day, father's day, halloween 4th of july day for friends family.",
		product_price: '',
		product_image_urls: [
			'https://m.media-amazon.com/images/I/61ric6BRvwL._AC_SX522_.jpg',
			'https://m.media-amazon.com/images/I/310bDBFZ-4L._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41EeFki-17L._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41JeHvLMRML._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/411BZ96KISL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/411jK4OTdsL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41FZrnWoilL._AC_SR38,50_.jpg',
		],
		product_rating: 4.5,
		product_url: 'https://www.amazon.com/Controller-Baseball-Embroidered-Classic-Adjustable/dp/B0CXLJ23RV',
		user: '67248fbef26a68fdb34763ea',
	},
	{
		_id: '672491a8f26a68fdb34763fc',
		product_title: "Casio Women's LQ139A-1B3 Black Classic Analog Casual Watch",
		product_description:
			'Case / bezel material: Resin\nResin Band, Resin Glass\nWater Resistant, not intended showering, swimming or scuba diving.\nApprox. battery life: 3 years on SR626SW',
		product_price: '',
		product_image_urls: [
			'https://m.media-amazon.com/images/I/61mwxJmJT0L._AC_SY741_.jpg',
			'https://m.media-amazon.com/images/I/3163VDECubL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41cRhJ37mKL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/218Bb4jVj-L._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41-mPncuIpL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/311yjTuzrcL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/21q3RHj42zL._AC_SR38,50_.jpg',
		],
		product_rating: 4.1,
		product_url: 'https://www.amazon.com/Casio-Womens-LQ139A-1B3-Black-Classic/dp/B000GB0G2K',
		user: '67248fbef26a68fdb34763ea',
	},
	{
		_id: '672491b7f26a68fdb3476400',
		product_title:
			'SAMSUNG Galaxy A35 5G A Series Cell Phone, 128GB Unlocked Android Smartphone, AMOLED Display, Advanced Triple Camera System, Expandable Storage, Rugged Design, US Version, 2024, Awesome Navy',
		product_description:
			'CIRCLE IT, SEARCH IT, FIND IT. JUST LIKE THAT: What’s your favorite influencer wearing? Where’d they go on vacation? What’s that word mean? Don’t try to describe it — use Circle to Search with Google¹ and get the answer in a snap\nOUR BRIGHTEST GALAXY A SERIES SCREEN YET: Thanks to Vision Booster, the screen seamlessly adjusts to your surroundings so you can enjoy uninterrupted streaming, gaming or browsing² even on the sunniest afternoon\nSTUNNING SHOTS. VIVID VIDEO: Advanced triple-lens camera turns every moment into a masterpiece; With high-res photos & high-definition video, it’s easy to capture awe-worthy content and optical image stabilization lets you capture it blur-free\nCAPTURE THE NIGHT LIKE NEVER BEFORE: Your nights just became a whole lot brighter with Galaxy A35 5G; Whether it’s fireworks, birthday candles or smiles under the stars, low-light photos and videos look clear as day with stunning Nightography\nNOW THERE’S EVEN MORE IN STORE: Enjoy big storage for big memories; With an upgraded internal storage of 128GB and up to 1TB expandable storage³; A35 5G keeps all your memories close without worry of running low on space\nSPLASHES DON’T STAND A CHANCE: Boasting an impressive IP67⁴ rating, A35 5G is safeguarded against water, dirt and dust; Whether you’re embarking on an excursion or simply navigating the challenges of daily life, A35 5G is ready for any adventure\nA DIGITAL WALLET IS ALREADY IN YOUR GALAXY: Carry your essentials conveniently in the digital wallet that’s made for your Galaxy phone and Watch⁵',
		product_price: '',
		product_image_urls: [
			'https://m.media-amazon.com/images/I/71YwZXmVcEL._AC_SX679_.jpg',
			'https://m.media-amazon.com/images/I/41X6xRv4XML._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/51KHkkGH-HL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41t02CtqQVL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/41S5cZsEPuL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/515Mro5xNZL._AC_SR38,50_.jpg',
			'https://m.media-amazon.com/images/I/51PmrIN-SQL._AC_SR38,50_.jpg',
		],
		product_rating: 4.4,
		product_url: 'https://www.amazon.com/SAMSUNG-A35-Unlocked-Smartphone-Expandable/dp/B0CV4NQYFP',
		user: '67248fbef26a68fdb34763ea',
	},
	{
		_id: '672491c7f26a68fdb3476405',
		product_title:
			'Seagate Portable 2TB External Hard Drive HDD — USB 3.0 for PC, Mac, PlayStation, & Xbox -1-Year Rescue Service (STGX2000400)',
		product_description:
			'Easily store and access 2TB of content on the go with the Seagate Portable Drive, a USB external hard drive\nDesigned to work with Windows or Mac computers, this external hard drive makes backup a snap just drag and drop\nTo get set up, connect the portable hard drive to a computer for automatic recognition no software required\nThis USB drive provides plug and play simplicity with the included 18 inch USB 3.0 cable',
		product_price: '',
		product_image_urls: [
			'https://m.media-amazon.com/images/I/71OMBvpTLvL._AC_SX425_.jpg',
			'https://m.media-amazon.com/images/I/31OAI1l3rSL._AC_US40_.jpg',
			'https://m.media-amazon.com/images/I/21Npmw5YgkL._AC_US40_.jpg',
			'https://m.media-amazon.com/images/I/41dimvOQRcL._AC_US40_.jpg',
			'https://m.media-amazon.com/images/I/31IFzMPZJFL._AC_US40_.jpg',
			'https://m.media-amazon.com/images/I/51RilB6qMIL._AC_US40_.jpg',
			'https://m.media-amazon.com/images/I/61iMw9EyxLL._AC_US40_.jpg',
			'https://m.media-amazon.com/images/I/51v8Zrr8q4L._AC_US40_.jpg',
		],
		product_rating: 4.7,
		product_url: 'https://www.amazon.com/Seagate-Portable-External-Hard-Drive/dp/B07CRG94G3',
		user: '67248fbef26a68fdb34763ea',
	},
	{
		_id: '672491dcf26a68fdb3476409',
		product_title: 'Lessons Learned: Learning from Crypto Winners and Losers',
		product_description: '',
		product_price: '',
		product_image_urls: [
			'https://m.media-amazon.com/images/I/61KKGqQR2+L._SY425_.jpg',
			'https://m.media-amazon.com/images/I/41JXO-8VDhL._SX38_SY50_CR,0,0,38,50_.jpg',
			'https://m.media-amazon.com/images/I/61+gQwPczLL._SX38_SY50_CR,0,0,38,50_.jpg',
		],
		product_rating: 5,
		product_url: 'https://www.amazon.com/Lessons-Learned-Learning-Crypto-Winners/dp/B0DJFNVXXB/',
		user: '67248fbef26a68fdb34763ea',
	},
];

export interface PaginationVaribles {
	limit: number;
	page: number;
}

export interface ProductsModalProps {
	setAuthMode: (val: AUTH_MODE) => void;
}

export const ProductsModal = ({ setAuthMode, authToken, setAuthToken }: any) => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [isLoading, setIsLoading] = useState(true); //
	const [currPage, setCurrPage] = useState(1);

	const modalRef = useRef<HTMLDivElement>(null);

	const { data, error, refetch } = useQuery({
		queryFn: () =>
			getProductsByUser(
				{
					limit: 5,
					page: currPage,
				},
				{
					access_token: authToken,
				},
			),
		queryKey: [currPage],
		enabled: !!authToken,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	const logout = () => {
		setAuthToken('');
		chrome?.storage?.local?.remove('access_token');
	};

	useEffect(() => {
		if (showSidebar && authToken) {
			refetch();
		}
	}, [showSidebar, authToken]);

	useEffect(() => {
		setIsLoading(true);
		chrome?.storage?.local?.get(['access_token'], (items) => {
			const token = items?.access_token;
			setAuthToken(token);
			setIsLoading(false);
		});
	}, [showSidebar]);

	useEffect(() => {
		if (modalRef?.current) {
			modalRef?.current?.scrollTo(0, 0);
		}
	}, [currPage]);

	return (
		<>
			<div
				onClick={() => {
					setShowSidebar(!showSidebar);
				}}
				className="sidebar-toggle"
				style={showSidebar ? sidebarToggleActive : sidebarToggle}
			>
				<div className="sidebar-icon" style={sidebarIcon}>
					<FaAngleLeft color="white" size="25" />
				</div>
			</div>
			<div ref={modalRef} className="sidebar-modal" style={showSidebar ? sidebarStylesActive : sidebarStyles}>
				{!isLoading &&
					(!authToken ? (
						<div style={sidebarLoginPromptContainer}>
							<h2>Login to see your saved products.</h2>
							<button
								style={primaryButtonStyle}
								onClick={() => {
									setAuthMode(AUTH_MODE.AUTH_LOGIN);
									setShowSidebar(false);
								}}
							>
								Log In
							</button>
						</div>
					) : (
						<div>
							<button style={primaryButtonStyle} onClick={logout}>
								Logout
							</button>
							{!isLoading ? (
								<div>
									{!data?.getProductsByUser?.products?.length ? (
										<h2>No Saved Products.</h2>
									) : (
										<>
											{data?.getProductsByUser?.products?.map((data: ProductDetail) => (
												<ProductDetail productDetails={data} />
											))}
											<Pagination
												paginationData={data?.getProductsByUser?.pagination}
												isLoading={isLoading}
												onNext={() => {
													setCurrPage(currPage + 1);
												}}
												onPrev={() => {
													setCurrPage(currPage - 1);
												}}
											/>
										</>
									)}
								</div>
							) : (
								<h2>Loading...</h2>
							)}
						</div>
					))}
			</div>
		</>
	);
};
