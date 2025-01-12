import React, { SVGProps } from "react";


const Icons = {
    dashboard : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#9197B3" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.28 13.61C15.15 14.74 13.53 15.09 12.1 14.64L9.51001 17.22C9.33001 17.41 8.96001 17.53 8.69001 17.49L7.49001 17.33C7.09001 17.28 6.73001 16.9 6.67001 16.51L6.51001 15.31C6.47001 15.05 6.60001 14.68 6.78001 14.49L9.36001 11.91C8.92001 10.48 9.26001 8.86001 10.39 7.73001C12.01 6.11001 14.65 6.11001 16.28 7.73001C17.9 9.34001 17.9 11.98 16.28 13.61Z" stroke="#9197B3" strokeWidth="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.45 16.28L9.59998 15.42" stroke="#9197B3" strokeWidth="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3945 10.7H13.4035" stroke="#9197B3" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>,
    dashboardIcon: <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.5003 34.8876C17.4674 34.8876 16.419 34.6564 15.602 34.1784L7.12284 29.2914C3.66951 26.9634 3.45367 26.6089 3.45367 22.9551V14.0443C3.45367 10.3905 3.65409 10.0359 7.04576 7.73887L15.5865 2.80553C17.2053 1.86512 19.749 1.86512 21.3678 2.80553L29.8778 7.70803C33.3311 10.0359 33.547 10.3905 33.547 14.0443V22.9397C33.547 26.5934 33.3465 26.948 29.9549 29.2451L21.414 34.1784C20.5815 34.6564 19.5332 34.8876 18.5003 34.8876ZM18.5003 4.42428C17.8528 4.42428 17.2207 4.54762 16.7736 4.8097L8.29451 9.7122C5.78159 11.408 5.78159 11.408 5.78159 14.0443V22.9397C5.78159 25.5759 5.78159 25.5759 8.35617 27.318L16.7736 32.1743C17.6832 32.6984 19.3328 32.6984 20.2424 32.1743L28.7215 27.2718C31.219 25.5759 31.219 25.5759 31.219 22.9397V14.0443C31.219 11.408 31.219 11.408 28.6445 9.66595L20.227 4.8097C19.7799 4.54762 19.1478 4.42428 18.5003 4.42428Z" fill="black"/>
    <path d="M18.5 24.2812C15.3088 24.2812 12.7188 21.6912 12.7188 18.5C12.7188 15.3088 15.3088 12.7188 18.5 12.7188C21.6912 12.7188 24.2812 15.3088 24.2812 18.5C24.2812 21.6912 21.6912 24.2812 18.5 24.2812ZM18.5 15.0312C16.5883 15.0312 15.0312 16.5883 15.0312 18.5C15.0312 20.4117 16.5883 21.9688 18.5 21.9688C20.4117 21.9688 21.9688 20.4117 21.9688 18.5C21.9688 16.5883 20.4117 15.0312 18.5 15.0312Z" fill="black"/>
    </svg>,
    users: <svg width="60" height="60" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="42" cy="42" r="42" fill="url(#paint0_linear_501_201)"/>
    <path d="M38.0302 41.0229C37.8552 41.0054 37.6452 41.0054 37.4527 41.0229C33.2877 40.8829 29.9802 37.4704 29.9802 33.2704C29.9802 28.9829 33.4452 25.5004 37.7502 25.5004C42.0377 25.5004 45.5202 28.9829 45.5202 33.2704C45.5027 37.4704 42.1952 40.8829 38.0302 41.0229Z" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M50.7172 28.9996C54.1122 28.9996 56.8422 31.7471 56.8422 35.1246C56.8422 38.4321 54.2172 41.1271 50.9447 41.2496C50.8047 41.2321 50.6472 41.2321 50.4897 41.2496" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M29.2805 47.4796C25.0455 50.3146 25.0455 54.9346 29.2805 57.7521C34.093 60.9721 41.9855 60.9721 46.798 57.7521C51.033 54.9171 51.033 50.2971 46.798 47.4796C42.003 44.2771 34.1105 44.2771 29.2805 47.4796Z" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M54.0947 57.0004C55.3547 56.7379 56.5447 56.2304 57.5247 55.4779C60.2547 53.4304 60.2547 50.0529 57.5247 48.0054C56.5622 47.2704 55.3897 46.7804 54.1472 46.5004" stroke="#00AC4F" strokeWidth="2.625" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
    <linearGradient id="paint0_linear_501_201" x1="74.55" y1="2.14197e-06" x2="42" y2="84" gradientUnits="userSpaceOnUse">
    <stop stopColor="#D3FFE7"/>
    <stop offset="1" stopColor="#EFFFF6"/>
    </linearGradient>
    </defs>
    </svg>
    
    
    
}    

export type IconType = keyof typeof Icons;

export type IconProps = {
    iconName: IconType;
    className?: string;
} & SVGProps<SVGElement>;

export const Icon = (props: IconProps) => {

    if(!Icons[props.iconName]) return (
        <p>Icon Not Found</p>
    )

    return (
        <div className={props.className}>
            {Icons[props.iconName]}
        </div>
    )
}

export default Icon;
