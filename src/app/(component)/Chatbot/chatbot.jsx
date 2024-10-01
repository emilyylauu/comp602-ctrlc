import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
	background: '#ffb8eb',
	headerBgColor: '#03209e',
	headerFontSize: '20px',
	botBubbleColor: '#0F3789',
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#FF5733',
	userFontColor: 'white',
};

const steps = [
	{
		id: 'hello-world',
		message: 'Hello World!',
		end: true,
	},
];

const ChatComponent = () => {
	return (
		<ThemeProvider theme={theme}>
			<ChatBot steps={steps} />
		</ThemeProvider>
	);
};

export default ChatComponent;
