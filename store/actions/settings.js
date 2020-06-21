import { fetchSetting, insertSetting } from '../../helpers/db';

export const SET_SAR_NUMBER = 'SET_SAR_NUMBER';

export const saveSARnumber = (SARNum) => {
    return async dispatch => {
        try {
            const dbResult = await insertSetting('SARnumber', SARNum);
        } catch (err) {
            throw err;
        }

        dispatch({ type: SET_SAR_NUMBER, SARnumber: SARNum })

    }

}

export const getSARnumber = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchSetting('sar');
            if (dbResult.rows._array.length > 0) {
                dispatch({ type: SET_SAR_NUMBER, SARnumber: dbResult.rows.item(0).settingsText});
            }
        } catch (err) {
            throw err;
        }

    };

};
