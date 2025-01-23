// import { formatDistance } from 'date-fns';
import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// const privacyPolicy = [
	// 	{
	// 		title: '1. Introduction',
	// 		content: [
	// 			"BookMyVenue ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the 'Platform'). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Platform.",
	// 		],
	// 	},
	// 	{
	// 		title: '2. Information We Collect',
	// 		content: [
	// 			'We collect information that you provide directly to us when you:',

	// 			'2.1 Create an account',
	// 			'2.2 List a venue',
	// 			'2.3 Make a booking',
	// 			'2.4 Contact our customer support',
	// 			'2.5 Participate in surveys or promotions',

	// 			'This information may include:',
	// 			'- Name',
	// 			'- Email address',
	// 			'- Phone number',
	// 			'- Payment information',
	// 			'- Location data',
	// 			'- Photos of venues',
	// 			'- Communication between users and venue owners',

	// 			'We also automatically collect certain information about your device and how you interact with our Platform, including:',
	// 			'- IP address',
	// 			'- Device type',
	// 			'- Browser type',
	// 			'- Operating system',
	// 			'- App usage data',
	// 			'- Cookies and similar technologies',
	// 		],
	// 	},
	// 	{
	// 		title: '3. How We Use Your Information',
	// 		content: [
	// 			'We use the information we collect to:',

	// 			'3.1 Provide, maintain, and improve our Platform',
	// 			'3.2 Process transactions and send transaction notifications',
	// 			'3.3 Send you technical notices, updates, security alerts, and support messages',
	// 			'3.4 Respond to your comments, questions, and customer service requests',
	// 			'3.5 Communicate with you about products, services, offers, and events',
	// 			'3.6 Monitor and analyze trends, usage, and activities in connection with our Platform',
	// 			'3.7 Detect, investigate, and prevent fraudulent transactions and other illegal activities',
	// 			'3.8 Personalize and improve the Platform and provide content or features that match user profiles or interests',
	// 		],
	// 	},
	// 	{
	// 		title: '4. Sharing of Information',
	// 		content: [
	// 			'We may share your information in the following situations:',

	// 			'4.1 With venue owners when you make a booking',
	// 			'4.2 With service providers who perform services on our behalf',
	// 			'4.3 To comply with legal obligations',
	// 			'4.4 To protect and defend our rights and property',
	// 			'4.5 With your consent or at your direction',

	// 			'We do not sell your personal information to third parties.',
	// 		],
	// 	},
	// 	{
	// 		title: '5. Data Retention',
	// 		content: [
	// 			'We store your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.',
	// 		],
	// 	},
	// 	{
	// 		title: '6. Security',
	// 		content: [
	// 			'We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.',
	// 		],
	// 	},
	// 	{
	// 		title: '7. Your Choices',
	// 		content: [
	// 			'You can access and update certain information about your account in the settings section of the app. You may also contact us to request access, correction, or deletion of personal information that you have provided to us. We may not accommodate a request to change information if we believe the change would violate any law or legal requirement or cause the information to be incorrect.',
	// 		],
	// 	},
	// 	{
	// 		title: '8. Changes to Our Privacy Policy',
	// 		content: [
	// 			"We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date at the top of this Privacy Policy.",
	// 		],
	// 	},
	// 	{
	// 		title: '9. Contact Us',
	// 		content: ['If you have any questions about this Privacy Policy, please contact us at:', 'BookMyVenue', 'Email: bookmyvenue7@gmail.com'],
	// 	},
	// ];
	return (
		<>
			<div className=" w-auto mx-3 md:mx-20 mt-24	">
				<h1 className="text-3xl font-bold">Privacy Policy</h1>
				{/* <p className="text-lg text-gray-700 whitespace-pre-line leading-6 mt-1">
					<em>Last update: {formatDistance(new Date('2024-06-22T16:24:43.714Z'), new Date(), { addSuffix: true })}</em>
				</p>
				<div className="mt-6">
					{privacyPolicy.map((section, index) => (
						<section key={index} className="mb-4">
							<h2 className="text-2xl font-semibold mb-2">{section.title}</h2>

							{section?.content?.map((content, idx) => (
								<p key={idx} className="text-gray-700 whitespace-pre-line leading-6 mb-2">
									{content}
								</p>
							))}
						</section>
					))}
				</div> */}
			</div>
		</>
	);
};

export default PrivacyPolicy;
