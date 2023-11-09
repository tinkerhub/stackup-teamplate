import React from 'react';

const Header = () => {
    const headerStyle = {
        backgroundColor: 'rgb(5, 59, 80)',
        width: '100%',
        height: '70px',
    };

    const logoStyle = {
        color: 'rgb(238, 238, 238)', 
    };

    const inputStyle={
        color: 'rgb(238, 238, 238)',
        border: 'none',
        width: '500px', 
        borderRadius: '20px', 
        padding: '8px'
    };

    const cartStyle = {
        color: 'rgb(238, 238, 238)', 
    };

    const loginStyle = {
        color: 'rgb(238, 238, 238)',
    };

    const iconStyle={

    };
    return (
        <div style={headerStyle}>
            <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
                <div style={logoStyle}>
                    Logo
                </div>
                <div style={inputContainerStyle}>
                <i className="material-icons" style={iconStyle}>
                </i>
                    <input type="text" placeholder="Search for Products" style={inputStyle}/>
                </div>
                <div>
                    <ul className="flex items-center gap-8">
                        <li style={cartStyle}>Cart</li>
                        <li style={loginStyle}>Login</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
