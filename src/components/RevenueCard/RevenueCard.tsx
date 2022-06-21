import { EuroOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { FunctionComponent } from "react";
import styles from "./RevenueCard.module.scss";

interface RevenueCardProps {
    type: 'revenue' | 'cost';
    value: number;
}

const RevenueCard: FunctionComponent<RevenueCardProps> = ({ type, value }) => {
    const revenueCardCls = styles["revenueCard"] + " " +
        (type === 'revenue' ? styles["revenueCard--revenue"] : styles["revenueCard--cost"]);
    return (
        <div className={revenueCardCls}>
            <Typography.Title
                type={type === 'revenue' ? "success" : "danger"}
                ellipsis
            >
                Total {type.charAt(0).toLocaleUpperCase() + type.substring(1)}&nbsp;
            </Typography.Title>
            <div className={styles["revenueCard__info"]}>
                <Typography.Title
                    type={type === 'revenue' ? "success" : "danger"}
                    ellipsis
                >{value}
                </Typography.Title>
                <EuroOutlined />
            </div>
        </div>
    );
}

export { RevenueCard };
export default RevenueCard;