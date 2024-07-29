'use client'
import React from "react";
import Menu from "./Menu";
import styles from "@/app/page.module.css";
import {Button} from "@/components";

export default function MenuContainer() {
    const [menu, setMenu] = React.useState(false);
    const handleMenu = (menu) => {
        setMenu(prevMenu => !prevMenu);
        console.log(menu);
    }
    return (
        <>
        {menu && <Menu />}
        <div className={styles.menuBtn}>
            {!menu && <Button icon={'/assets/plus.svg'} content={'Menu'} backgroundColor={'rgba(255, 255, 255, 0.5)'} color={'var(--black)'} border={'solid 1px rgba(0,0,0,0.1)'} onClick={handleMenu} /> }
            {menu  && <Button icon={'/assets/cross.svg'} content={''} backgroundColor={'var(--primary)'} color={'var(--white)'} border={'var(--primary)'} onClick={handleMenu}/>}
        </div>
        </>
    )
}