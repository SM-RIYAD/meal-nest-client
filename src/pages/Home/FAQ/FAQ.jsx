import React from 'react';

const FAQ = () => {
    return (
        <div>
             <div className='lg:max-w-6xl mx-auto my-32 text-red-400'>

<h1 className='lg:text-4xl text-red-400 text-xl p-1 text-center font-bold my-10'>FREQUENTLY ASKED QUESTIONS</h1>
<div className="join join-vertical w-full">
<div className="collapse collapse-arrow join-item border text-red-400  "> 
<input type="radio"  name="my-accordion-4" checked="checked" /> 
<div className="collapse-title text-xl font-medium">
How can I add, delete, or update meals as an admin on Meal Nest?
</div>
<div className="collapse-content"> 
<p>As an admin, managing meals is easy. Navigate to the admin dashboard, where you'll find options to add new meals, delete existing ones, or update meal details. Follow the intuitive interface to make the necessary changes effortlessly.</p>
</div>
</div>
<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
Can users search for meals based on specific categories like breakfast, lunch, or dinner?
</div>
<div className="collapse-content"> 
<p>Absolutely! Meal Nest provides a user-friendly search feature. Users can filter meals based on categories such as breakfast, lunch, and dinner. Simply use the search bar or explore the category options to find the perfect meal.</p>
</div>
</div>
<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
How can users like and leave reviews for meals on Meal Nest?
</div>
<div className="collapse-content"> 
<p>Expressing your feedback is encouraged! To like a meal, click on the 'Like' button associated with the meal. For reviews, find the 'Leave a Review' option on the meal's page. Share your thoughts and ratings to help others make informed decisions about their meal choices.</p>
</div>
</div>

<div className="collapse collapse-arrow join-item border border-base-300">
<input type="radio" name="my-accordion-4" /> 
<div className="collapse-title text-xl font-medium">
What measures does Meal Nest take to ensure the quality and safety of the meals offered?
</div>
<div className="collapse-content"> 
<p> At Meal Nest, we prioritize the quality and safety of every meal. Admins regularly review and update meal information. Additionally, user reviews and ratings contribute to maintaining a high standard. We work closely with meal providers to ensure adherence to hygiene and safety standards.</p>
</div>
</div>
</div>
</div>
        </div>
    );
};

export default FAQ;