import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getProvinces, getDistricts, getWards } from '../api/provincesApi';

const AddressSelector = ({ onAddressChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

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
        setSelectedDistrict(null);
        setWards([]);
        setSelectedWard(null);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        const data = await getWards(selectedDistrict.code);
        setWards(data);
        setSelectedWard(null);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  useEffect(() => {
    if (onAddressChange) {
      onAddressChange({
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
      });
    }
  }, [selectedProvince, selectedDistrict, selectedWard, onAddressChange]);

  return (
   <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
        <Select
          options={provinces.map((p) => ({ value: p.code, label: p.name }))}
          onChange={(option) =>
            setSelectedProvince(
              option ? provinces.find((p) => p.code === option.value) : null
            )
          }
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
          onChange={(option) =>
            setSelectedDistrict(
              option ? districts.find((d) => d.code === option.value) : null
            )
          }
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
          onChange={(option) =>
            setSelectedWard(
              option ? wards.find((w) => w.code === option.value) : null
            )
          }
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