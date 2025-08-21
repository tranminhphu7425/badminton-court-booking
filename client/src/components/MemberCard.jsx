const MemberCard = ({ member }) => {
   return (
    <div
      key={member.id}
      className="bg-white dark:bg-gray-600 rounded-xl overflow-hidden shadow-sm text-center"
    >
      <div className="h-50 bg-gray-200 overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-1 dark:text-white">
        {member.name}
      </h3>
      <p className="text-green-600 dark:text-green-400 font-medium mb-3">
        {member.position}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
    </div>
  </div>
   );
};


export default MemberCard;