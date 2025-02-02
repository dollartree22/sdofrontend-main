import React, { useEffect } from "react";
import context from "../context/context";
import { useContext } from "react";
import Loading from "../components/loading"
import TreeView from "../components/TreeView";

const FamilyTree = () => {
    const a = useContext(context);
    const getreferrals = a.getreferrals;
    const refferals = a.refferals
    const me = a.me;
    const loading = a.loading;
    useEffect(() => {
        if (me._id) {
            getreferrals()
        }
    }, [me])


    return (
        <div className="container backroundrefferal" style={{marginTop:"100px",minHeight:"80vh"}}>
            {loading ? <Loading /> :
               <div className="App">
               <TreeView data={refferals} />
             </div>
            }
        </div>
    );
};

export default FamilyTree;
