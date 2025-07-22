# Web Development Project 6 - Marvel Characters Dashboard Part 2

Submitted by: **Enmanuelle Martinez**

This web app: **This is a React.js web app that integrates the Marvel public API to display a dynamic dashboard of characters. It features a search bar, optimized filters (including a custom range slider and dropdown), and detailed character views using react-router-dom. Styled with modern CSS, the app allows users to easily browse and explore characters, with plans to extend functionality by manually adding iconic heroes like Spider-Man, Iron Man, and Hulk through custom data handling.**

Time spent: **14** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - _To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording._
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - _To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording._
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset

The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations

The following **additional** features are implemented:

- [x]List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

**Demo- 1**
<img src='https://github.com/user-attachments/assets/910c00b7-95d0-450b-8dda-c201b684de9f' title='Video Walkthrough' width='' alt='Video Walkthrough' />

**Demo- 2**
<img src='https://github.com/user-attachments/assets/3a9419b1-65da-44ea-bd5a-c9ee4f89959b' title='Video Walkthrough' width='' alt='Video Walkthrough' />

**Demo- 3**
<img src='https://github.com/user-attachments/assets/230e5d19-ef11-41b1-8187-d00e314e55db' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## Screenshots Walkthrough

<img width="1728" height="1117" alt="Image" src="https://github.com/user-attachments/assets/cfdf9757-fc44-46d7-b01e-de6dbaa99ce0" />

<img width="1728" height="1117" alt="Image" src="https://github.com/user-attachments/assets/733285f6-fcb5-427f-89f4-7845f6f45b00" />

<img width="1728" height="1117" alt="Image" src="https://github.com/user-attachments/assets/8050f72f-bdac-4fbc-be6e-14e9fec11058" />

<img width="1728" height="1117" alt="Image" src="https://github.com/user-attachments/assets/73187f11-01b2-45d7-a958-b8adb40c9e9c" />

<img width="1728" height="1117" alt="Image" src="https://github.com/user-attachments/assets/84643dcb-3c10-4f3f-a5bc-e95fae5283e8" />

<!-- Replace this with whatever GIF tool you used! -->

GIF created with GIPHY ...

<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

One interesting challenge was building a responsive sidebar that worked seamlessly with React Router DOM for navigation. The goal was to allow users to navigate between different views (like dashboard, detail pages, or future routes) without reloading the app.

We had to ensure that the sidebar remained consistent across routes, supported active route highlighting, and adapted well to both desktop and mobile views. Handling this while keeping the route-based rendering clean and modular required structuring our component tree carefully and utilizing <Outlet /> and and NavLink features effectively.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
