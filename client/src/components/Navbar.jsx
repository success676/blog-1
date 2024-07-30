import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkIsAuth, logout } from "./../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeStyles = {
        color: "white",
    };

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem("token");
        toast("Вы вышли из системы.");

        // Добавил фикс ошибки при выходе, когда был в моих постах
        navigate("/");
    };

    // Добавил фикс перехода на главную при нажатии на лого
    const goMainPage = () => {
        navigate("/");
    };

    return (
        <div className="flex py-4 justify-between items-center">
            <span
                onClick={goMainPage}
                className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm cursor-pointer"
            >
                E
            </span>

            {isAuth && (
                <ul className="flex gap-8">
                    <li>
                        <NavLink
                            to={"/"}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/posts"}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мои посты
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/new"}
                            href="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Добавить пост
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2 cursor-pointer">
                {isAuth ? (
                    <button onClick={logoutHandler}>Выйти</button>
                ) : (
                    <Link to={"/login"}> Войти </Link>
                )}
            </div>
        </div>
    );
};
