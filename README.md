## Setup Instruction

1. Clone repository (git clone git@github.com:francissalvamante/wapp-exam.git)
2. Open terminal and go to directory, run `npm i` to install necessary `node_modules` for running the application and `dev dependencies` needed for development
3. Create `.env.local` file in the root folder of the project
   - Required `Environment Variables`:
     - NEXT_PUBLIC_OPEN_WEATHER_API_KEY
       - You can get API Key from OpenWeather website (https://openweathermap.org)
       - Create your account and subscribe to `One Call API 3.0`. It is pay as you go, but allows up to `1000 calls per day` DISCLAIMER - Card (debit/credit) number is required to subscribe.
       - Once subscribed, you need to wait a few hours (in my case, it was an hour) before the `API_KEY` was activated
   - NEXT_PUBLIC_OPEN_WEATHER_GEO_URL
     - Value is `http://api.openweathermap.org/geo/1.0/direct`. This is OpenWeather's Geolocation service. This is necessary for the input dropdown that shows locations based on user input
   - NEXT_PUBLIC_OPEN_WEAHTER_URL
     - Value is `https://api.openweathermap.org/data/3.0/onecall`. This is most definitely necessary to fetch current weather and forecast
   - NEXT_PUBLIC_OPEN_WEATHER_HISTORICAL_URL
     - Value is `https://api.openweathermap.org/data/3.0/onecall/timemachine`. This is necessary to fetch historical data (40+ years historical archive)
4. Once setup is done, you can now run it by using `npm run dev` on your terminal

## Assumptions

1. Initially, when I started working on the project, there was no need for routing since everything can be in one screen, but since there's a requirement to use Routing I decided to separate the 5-Day Historical Data and the Custom Date 5-Day Historical Data
2. I already developed a weather app when I started using React and NextJS and the main problem that I had during that time was that the user has no control over what location they really want. For example, if a user inputs `Maine`, my app does not know which `Maine` the user wants to know the weather to, so for this project, I implemented a dropdown in the input field that shows possible values and when user clicks which location that is, that option already has the coordinates needed by OpenWeather to properly pinpoint the location.
3. I thought everything was going to be straightforward, but because of the nature of OpenWeather's API response I needed to create some helper files to convert somethings (e.g. Wind Speed, Wind Direction)

## Major Takeaways

1. I am happy with the result of the project and I hope that it shows the ability that I have with developing using React and/or NextJS
2. This was, as always, an enjoyable moment. A learning experience on what I need to brush up more on.
