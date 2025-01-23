import { useEffect } from 'react';

const CancelAndRefund = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const data = [
		{
			title: '1. Introduction',
			content: [
				'This Cancellation and Refund Policy outlines the terms and conditions for cancellations and refunds on BookMyVenue. By using our platform, you agree to comply with this policy.',
			],
		},
		{
			title: '2. Cancellation by Guests',
			content: [
				'2.1 Free Cancellation Period:',
				'- Bookings cancelled more than 48 hours before the event start time are eligible for a full refund.',
				'- The free cancellation period may vary for certain high-demand dates or venues. Always check the specific cancellation terms for your booking.',
				'2.2 Late Cancellations:',
				'- Bookings cancelled within 48 hours of the event start time are subject to a 50% cancellation fee.',
				'- Bookings cancelled within 24 hours of the event start time are non-refundable.',

				'2.3 No-Shows:',
				'- Failure to show up for your booking without prior cancellation will result in no refund.',
			],
		},
		{
			title: '3. Cancellation by Venue',
			content: [
				'3.1 If a venue cancels a booking:',
				'- The guest will receive a full refund.',
				'- BookMyVenue will assist in finding an alternative venue where possible.',
				'3.2 Force Majeure:',
				'- In cases of events beyond reasonable control (e.g., natural disasters, government actions), BookMyVenue will work with both parties to reach a fair resolution.',
			],
		},
		{
			title: '4. Refund Process',
			content: [
				'4.1 Eligible refunds will be processed within 5-10 business days.',
				'4.2 Refunds will be issued to the original payment method used for the booking.',
				'4.3 Any applicable cancellation fees will be deducted from the refund amount.',
			],
		},

		{
			title: '5. Disputes',
			content: [
				'5.1 In case of disputes regarding cancellations or refunds, guests should contact BookMyVenue customer support.',
				'5.2 BookMyVenue will review each case individually and strive to reach a fair resolution.',
				"5.3 BookMyVenue's decision on disputes will be final and binding.",
			],
		},
		{
			title: '6. Special Circumstances',
			content: [
				'6.1 For group bookings, events, or high-value reservations, special cancellation terms may apply. These will be clearly communicated at the time of booking.',
				'6.2 During peak seasons or for special events, stricter cancellation policies may be in effect. Always review the specific terms for your booking.',
			],
		},
		{
			title: '7. Changes to This Policy',
			content: [
				'7.1 BookMyVenue reserves the right to modify this Cancellation and Refund Policy at any time.',
				'7.2 Changes will be effective immediately upon posting on our platform.',
				'7.3 Continued use of BookMyVenue after changes constitutes acceptance of the updated policy.',
			],
		},
		{
			title: '8. Contact Us',
			content: [
				'If you have any questions about this Cancellation and Refund Policy, please contact us at:',
				'BookMyVenue',
				'Email: bookmyvenue7@gmail.com',
			],
		},
	];
	return (
		<>
			<div className=" w-auto mx-3 md:mx-20 mt-24	">
				<h1 className="text-3xl font-bold">Cancellation and Refund Policy</h1>
				<div className="mt-6">
					{data?.map((section, index) => (
						<section key={index} className="mb-4">
							<h2 className="text-2xl font-semibold mb-2">{section.title}</h2>

							{section?.content?.map((content, idx) => (
								<p key={idx} className="text-gray-700 whitespace-pre-line leading-6 mb-2">
									{content}
								</p>
							))}
						</section>
					))}
				</div>
			</div>
		</>
	);
};

export default CancelAndRefund;
