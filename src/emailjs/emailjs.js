import React from 'react'
import emailjss from 'emailjs-com';

export default function emailjs() {
React.useEffect(() => {
emailjss.init('template_1mZp81Q7');
}, [])
return  emailjss;
}

