import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getProvinces, getDistricts, getWards } from '../api/provincesApi';

const AddressSelector = ({ onAddressChange, selectedProvince, selectedDistrict, selectedWard }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        const data = await getDistricts(selectedProvince.code);
        setDistricts(data);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        const data = await getWards(selectedDistrict.code);
        setWards(data);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const handleProvinceChange = (option) => {
    const province = option ? provinces.find((p) => p.code === option.value) : null;
    onAddressChange({
      province,
      district: null,
      ward: null,
    });
  };

  const handleDistrictChange = (option) => {
    const district = option ? districts.find((d) => d.code === option.value) : null;
    onAddressChange({
      province: selectedProvince,
      district,
      ward: null,
    });
  };

  const handleWardChange = (option) => {
    const ward = option ? wards.find((w) => w.code === option.value) : null;
    onAddressChange({
      province: selectedProvince,
      district: selectedDistrict,
      ward,
    });
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
        <Select
          options={provinces.map((p) => ({ value: p.code, label: p.name }))}
          onChange={handleProvinceChange}
          value={
            selectedProvince
              ? { value: selectedProvince.code, label: selectedProvince.name }
              : null
          }
          placeholder="Chọn tỉnh/thành phố"
          isClearable
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
        <Select
          options={districts.map((d) => ({ value: d.code, label: d.name }))}
          onChange={handleDistrictChange}
          value={
            selectedDistrict
              ? { value: selectedDistrict.code, label: selectedDistrict.name }
              : null
          }
          placeholder="Chọn quận/huyện"
          isClearable
          isDisabled={!selectedProvince}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phường/Xã</label>
        <Select
          options={wards.map((w) => ({ value: w.code, label: w.name }))}
          onChange={handleWardChange}
          value={
            selectedWard
              ? { value: selectedWard.code, label: selectedWard.name }
              : null
          }
          placeholder="Chọn phường/xã"
          isClearable
          isDisabled={!selectedDistrict}
        />
      </div>
    </>
  );
};

export default AddressSelector;